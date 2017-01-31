function editLProgramPrice(id, is_new, callback) {
//*********variables**********

//**********stores**********
    var lProgramHistoryStore = Ext.create('Ext.data.Store', {
        model: 'LProgramPriceHistoryModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_lprogram_price_history_list.php',
            extraParams: {id: 0},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            }
        },
        pageSize: 1000000000
    });

    lProgramHistoryStore.getProxy().extraParams = {id: id};
    lProgramHistoryStore.load({
        callback: function (records, operation, success) {
            var priceHistory = lProgramHistoryStore.getById(id);
            if (priceHistory) {
                //**********fields**********

                var changeDateField = Ext.create('Ext.form.field.Date', {
                    fieldLabel: 'дата изменения',
                    value: priceHistory.data.date_begin,
                    format: 'd.m.Y',
                    allowBlank: false
                });

                var valueField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'сумма',
                    value: priceHistory.data.price,
                    minValue: 0,
                    allowBlank: false,
                    allowDecimal: true
                });


                //**********panels**********

                var fieldsPanel = Ext.create('Ext.form.Panel', {
                    border: false,
                    bodyPadding: 5,
                    region: 'north',
                    bodyCls: 'alt-background',
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 150,
                        anchor: '100%'
                    },
                    items: [
                        changeDateField,
                        valueField
                    ]
                });

                var formPanel = Ext.create('Ext.form.Panel', {
                    border: false,
                    layout: 'border',
                    items: [fieldsPanel]
                })



                function delNew(callback) {
                    function done(result, request) {
                        if (result.responseText == 'ok') {
                            if (callback) {
                                callback()
                            }
                        }
                    }

                    if (is_new == 1) {
                        Ext.Ajax.request({
                            url: 'AS_lprogram_price_history_delete.php',
                            success: done,
                            params: {
                                id: id,
                                user_id: sessvars.userId
                            }
                        });
                    }
                }

                function save() {

                    function fail(result, request) {
                        formPanel.body.unmask();
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        delNew();
                        is_new = 0;
                    }

                    function done(result, request) {
                        formPanel.body.unmask();
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback(parseInt(result.responseText.substr(3)))
                            }
                            is_new = 0;
                            win.close();
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                            // delNew();
                            // is_new = 0;
                            return;
                        }
                    }
                    formPanel.body.mask('Сохранение...');
                    Ext.Ajax.request({
                        url: 'AS_lprogram_price_history_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            learning_program_id: priceHistory.data.learning_program_id,
                            change_date: changeDateField.getValue(),
                            price: valueField.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (id == -1) ? 'Новая стоимость' : 'Редактирование',
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    autoScroll: true,
                    height: 150,
                    width: 400,
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
                                    if (changeDateField.getValue() == null || changeDateField.getValue() == '') {
                                        Ext.Msg.alert('Ошибка', 'не введена дата');
                                        return;
                                    }
                                    save();
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
                                    delNew(function () {
                                        if (callback) {
                                            callback()
                                        }
                                    });
                                    win.close();
                                }
                            }
                        }

                    ],
                    listeners: {
                        'close': function (win) {
                            delNew();
                        }
                    }
                }).show();

            }
        }
    });



}