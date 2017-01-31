
function createLDiscEditWindow(ldisc_id, ldisc_name, learning_discipline_type, callback) {
    var lDiscNameField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'Дисциплина',
        allowBlank: false,
        value: ldisc_name
    });

    lDiscNameField.validate();

    var lDiscTypeRG = Ext.create('Ext.form.RadioGroup', {
        fieldLabel: 'Тип дисциплины',
        columns: 1,
        vertical: true,
        items: [
            {boxLabel: 'теория', name: 'lDiscTypeRB', id: 'lDiscTypeRGTheoryRB', inputValue: '0', checked: learning_discipline_type == '0'},
            {boxLabel: 'практика', name: 'lDiscTypeRB', id: 'lDiscTypeRGPracticeRB', inputValue: '1', checked: learning_discipline_type == '1'},
            {boxLabel: 'другое', name: 'lDiscTypeRB', id: 'lDiscTypeRGOtherRB', inputValue: '2', checked: learning_discipline_type == '2'},
        ]
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
            lDiscNameField,
            lDiscTypeRG,
        ]
    });

    function saveLDiscData() {

        function failSaveLDisc(result, request) {
            formPanel.body.unmask();
            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }
        ;
        function doneSaveLDisc(result, request) {
            formPanel.body.unmask();
            if (result.responseText.substr(0, 2) == 'ok') {
                if (callback) {
                    callback(parseInt(result.responseText.substr(3)))
                }
                ldisc_win.close();
            } else {
                Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                return;
            }
        }
        if (Ext.getCmp('lDiscTypeRGTheoryRB').getValue()) {
            type = '0';
        }
        if (Ext.getCmp('lDiscTypeRGPracticeRB').getValue()) {
            type = '1';
        }
        if (Ext.getCmp('lDiscTypeRGOtherRB').getValue()) {
            type = '2';
        }
        formPanel.body.mask('Сохранение...');
        Ext.Ajax.request({
            url: 'AS_dict_ldisc_edit.php',
            success: doneSaveLDisc,
            failure: failSaveLDisc,
            params: {
                id: ldisc_id,
                name: lDiscNameField.getValue(),
                type: lDiscTypeRG.getValue(),
                user_id: sessvars.userId
            }
        });
    }

    var ldisc_win = new Ext.Window({
        title: (ldisc_id == -1) ? 'Новая дисциплина' : 'Редактирование дисциплины',
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
                        if (!lDiscNameField.isValid()) {
                            Ext.Msg.alert('Ошибка', 'Поле "Дисциплина" должно быть заполнено.');
                            return;
                        }


                        saveLDiscData();
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
                        ldisc_win.close();
                    }
                }
            }

        ]
    }).show();
}