function createLProgramDeleteWindow(id, name_full, callback) {

    var formPanel = Ext.create('Ext.form.Panel', {
        frame: false,
        bodyPadding: 5,
        bodyCls: 'alt-background',
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 150,
            anchor: '100%'
        },
        items: [{
                xtype: 'label',
                forId: 'myLabel',
                text: 'Удалить программу обучения "' + name_full + '"?',
                margin: '0 0 0 10'
            }]
    });

    function deleteLProgram() {
        function failDelLProgram(result, request) {
            formPanel.body.unmask();
            Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }
        ;
        function doneDelLProgram(result, request) {
            formPanel.body.unmask();
            if (result.responseText == 'ok') {
                if (callback) {
                    callback()
                }
                ;
                del_lprogram_win.close();

            } else {
                Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
            }

        }
        formPanel.body.mask('Сохранение...');
        Ext.Ajax.request({
            url: 'AS_lprogram_delete.php',
            success: doneDelLProgram,
            failure: failDelLProgram,
            params: {
                id: id,
                user_id: sessvars.userId
            }
        });
    }

    var del_lprogram_win = new Ext.Window({
        title: 'Удаление транспортного средства.',
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
                        deleteLProgram();
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
                        del_lprogram_win.close();
                    }
                }
            }

        ]
    }).show();
}
