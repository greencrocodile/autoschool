
function editAccrual(id, is_new, callback) {

    var accrualsStore = Ext.create('Ext.data.Store', {
        model: 'StudentAccrualsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_student_accruals_list.php',
            extraParams: {id: -1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });

    accrualsStore.getProxy().extraParams = {id: id};
    accrualsStore.load({
        callback: function (records, operation, success) {

            var accr = accrualsStore.getById(id);
            if (accr) {

                var typesStore = Ext.create('Ext.data.Store', {
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
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            typeCombo.setValue(accr.data.payment_type_id);
                        }
                    }
                });
                typesStore.load();

                var typeCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Тип платежа',
                    store: typesStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    editable: false,
					matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    }
                });

                var valueField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'сумма',
                    allowBlank: true,
                    allowDecimal: true,
                    margin: '5 5 5 5',
                    value: accr.data.value
                });



               var formPanel = Ext.create('Ext.form.Panel', {
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
                        typeCombo,
                        valueField
                    ]
                });

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
                            url: 'AS_student_accrual_delete.php',
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
                            return;
                        }
                    }
                    formPanel.body.mask('Сохранение...');
                    Ext.Ajax.request({
                        url: 'AS_student_accrual_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
							student_operation_id: accr.data.student_operation_id,
                            payment_type_id: typeCombo.getValue(),
							value: valueField.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новое начисление' : 'Редактирование начисления',
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
                                    if (typeCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'Не выбран тип документа');
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