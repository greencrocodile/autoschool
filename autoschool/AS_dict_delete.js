function deleteSchoolUnit(id, name, callback) {
    Ext.MessageBox.confirm('Confirm', 'Удалить ' + name + '?', function (btn) {
        function done(result, request) {
            callback();
        }
        function fail(result, request) {
            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }
        
        if (btn == 'yes') {
            Ext.Ajax.request({
                url: 'AS_school_unit_delete.php',
                success: done,
                failure: fail,
                params: {
                    id: id,
                    hard_delete: 0,
                    user_id: sessvars.userId
                }
            });
        }
    })
}
function createDictDeleteWindow(id, name, dict_name, value_label, callback) {

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
                text: 'Удалить значение "' + name + '" из справочника "' + value_label + '"?',
                margin: '0 0 0 10'
            }]
    });

    function deleteData() {
        function failDelDict(result, request) {
            formPanel.body.unmask();
            Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }

        function doneDelDict(result, request) {
            formPanel.body.unmask();
            if (result.responseText == 'ok') {
                if (callback) {
                    callback();
                }
                del_win.close();

            } else {
                Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
            }

        }
        formPanel.body.mask('Сохранение...');
        Ext.Ajax.request({
            url: 'AS_dict_delete.php',
            success: doneDelDict,
            failure: failDelDict,
            params: {
                id: id,
                dict_name: dict_name,
                user_id: sessvars.userId
            }
        });
    }

    var del_win = new Ext.Window({
        title: value_label + '. Удаление.',
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
                        deleteData();
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
                        del_win.close();
                    }
                }
            }

        ]
    }).show();
}
