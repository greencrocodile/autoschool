function createDictEditWindow(id, name, dict_name, value_label, callback) {
    var dictNameField = Ext.create('Ext.form.field.Text', {
        fieldLabel: value_label,
        allowBlank: false,
        value: name
    });

    dictNameField.validate();

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
            dictNameField
        ]
    });

    function saveDictData() {
        function failSaveDict(result, request) {
            formPanel.body.unmask();
            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }
        ;
        function doneSaveDict(result, request) {
            formPanel.body.unmask();
            if (result.responseText.substr(0, 2) == 'ok') {
                if (callback) {
                    callback(parseInt(result.responseText.substr(3)))
                }
                dict_win.close();
            } else {
                Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
            }

        }
        formPanel.body.mask('Сохранение...');
        Ext.Ajax.request({
            url: 'AS_dict_edit.php',
            success: doneSaveDict,
            failure: failSaveDict,
            params: {
                id: id,
                name: dictNameField.getValue(),
                dict_name: dict_name,
                user_id: sessvars.userId
            }
        });
    }

    var dict_win = new Ext.Window({
        title: (id == -1) ? value_label + '. Добавление.' : value_label + '. Редактирование.',
        layout: 'fit',
        resizable: false,
        modal: true,
        autoScroll: true,
        height: 100,
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
                        if (!dictNameField.isValid()) {
                            Ext.Msg.alert('Ошибка', 'Поле "' + value_label + '" должно быть заполнено.');
                            return;
                        }
                        saveDictData();
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
                        dict_win.close();
                    }
                }
            }

        ]
    }).show();
}
