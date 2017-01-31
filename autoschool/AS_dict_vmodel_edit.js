
Ext.define("VehicleMarks", {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'jsonp',
        url: 'AS_dict_list.php',
        extraParams: {dict_name: 'vehicle_marks', start_id: -1},
        reader: {
            type: 'json',
            root: 'list'
        },
        pageSize: 0
    },
    fields: [
        {name: 'id', mapping: 'id'},
        {name: 'name', mapping: 'name'}
    ]
});
function createVModelEditWindow(model_id, model_name, mark_id, callback) {



    var modelNameField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'Модель',
        margin: '5 5 5 5',
        allowBlank: false,
        value: model_name
    });

    modelNameField.validate();

    var vMarksStore = Ext.create('Ext.data.Store', {
        model: 'VehicleMarks',
        listeners: {
            'load': function () {
                vMarksCombo.setValue(mark_id);
            }
        }
    });

    vMarksStore.load();

    var vMarksCombo = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Марка',
        store: vMarksStore,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        editable: false,
        margin: '5 5 5 5',
    });

    var bAddMark = Ext.create('Ext.Button', {
        text: 'Добавить марку...',
        margin: '0 5 5 5',
        handler: function () {
            createDictEditWindow(-1, '', 'vehicle_marks', 'Марка автомобиля', function (id) {
                mark_id = id;
                vMarksStore.load();
            });
        }
    });

    var formPanel = Ext.create('Ext.form.Panel', {
        frame: false,
        bodyPadding: 5,
        bodyCls: 'alt-background',
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 150,
            anchor: '100%'
        },
        items: [
            modelNameField,
            vMarksCombo,
            bAddMark
        ]
    });

    function saveModelData() {

        function failSaveModel(result, request) {
            formPanel.body.unmask();
            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }
        ;
        function doneSaveModel(result, request) {
            formPanel.body.unmask();
            if (result.responseText.substr(0, 2) == 'ok') {
                if (callback) {
                    callback(parseInt(result.responseText.substr(3)))
                }
                model_win.close();
            } else {
                Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                return;
            }
        }
        formPanel.body.mask('Сохранение...');
        Ext.Ajax.request({
            url: 'AS_dict_vmodel_edit.php',
            success: doneSaveModel,
            failure: failSaveModel,
            params: {
                id: model_id,
                name: modelNameField.getValue(),
                mark_id: vMarksCombo.getValue(),
                user_id: sessvars.userId
            }
        });
    }

    var model_win = new Ext.Window({
        title: (model_id == -1) ? 'Новая модель' : 'Редактирование модели',
        layout: 'fit',
        resizable: false,
        modal: true,
        autoScroll: true,
        height: 200,
        width: 600,
        items: [formPanel],
        bbar: [
            {xtype: 'tbfill'},
            {
                xtype: 'button',
                text: 'ОК',
                width: 150,
                listeners: {
                    render: function () {
                        this.addCls("x-btn-default-small");
                        this.removeCls("x-btn-default-toolbar-small");
                    },
                    click: function () {
                        if (!modelNameField.isValid()) {
                            Ext.Msg.alert('Ошибка', 'Поле "Модель" должно быть заполнено.');
                            return;
                        }
                        if (vMarksCombo.getValue() == -1) {
                            Ext.Msg.alert('Ошибка', 'Марка не задана!');
                            return;
                        }
                        saveModelData();
                    }
                }
            }, {
                xtype: 'button',
                text: 'Отмена',
                width: 150,
                listeners: {
                    render: function () {
                        this.addCls("x-btn-default-small");
                        this.removeCls("x-btn-default-toolbar-small");
                    },
                    click: function () {
                        model_win.close();
                    }
                }
            }

        ]
    }).show();
}