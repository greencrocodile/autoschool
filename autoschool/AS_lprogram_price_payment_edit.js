function editLProgramPricePayment(id, is_new, callback) {
//*********variables**********

//**********stores**********
    var lProgramHistoryPaymentsStore = Ext.create('Ext.data.Store', {
        model: 'LProgramPriceHistoryPaymentsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_lprogram_price_history_payments_list.php',
            extraParams: {history_id: 0},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            }
        },
        pageSize: 1000000000
    });

    lProgramHistoryPaymentsStore.getProxy().extraParams = {history_id: -1};
    lProgramHistoryPaymentsStore.load({
        callback: function (records, operation, success) {
            var priceHistoryPayment = lProgramHistoryPaymentsStore.getById(id);
            if (priceHistoryPayment) {

                var paymentTypesStore = Ext.create('Ext.data.Store', {
                    model: 'PaymentTypesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_payment_types_list.php',
                        extraParams: {start_id: -1, parent_id: -1},
                        reader: {
                            type: 'json',
                            root: 'list'
                        },
                        simpleSortMode: true
                    },
                    listeners: {
                        'load': function () {
                            lPaymentTypesCombo.setValue(priceHistoryPayment.data.price_part_id);
                        }
                    },
                    pageSize: 1000000000
                });
                paymentTypesStore.getProxy().extraParams = {start_id: -1, parent_id: -1};
                paymentTypesStore.load();

                //**********fields**********

                var lPaymentTypesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Тип платежа',
                    store: paymentTypesStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
                });
                var requiredField = Ext.create('Ext.form.field.Checkbox', {
                    fieldLabel: 'Обязательный платёж',
                    value: 'true',
                    margin: '5 5 5 5'
                });
                if (priceHistoryPayment.data.required == 0) {
                    requiredField.setValue('false')
                } else {
                    requiredField.setValue('true')
                }


                var valueField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'сумма',
                    margin: '5 5 5 5',
                    value: priceHistoryPayment.data.value,
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
                        lPaymentTypesCombo, requiredField, valueField
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
                            url: 'AS_lprogram_price_history_payment_delete.php',
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
                        url: 'AS_lprogram_price_history_payment_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            history_id: priceHistoryPayment.data.history_id,
                            required: (requiredField.getValue()) ? 1 : 0,
                            payment_type_id: lPaymentTypesCombo.getValue(),
                            value: valueField.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (id == -1) ? 'Новый платёж' : 'Редактирование платежа',
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
                                    if (lPaymentTypesCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбран тип платежа');
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