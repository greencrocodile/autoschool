Ext.Loader.setPath('Ext.ux', 'ux');
Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.data.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.toolbar.*'
]);

Ext.onReady(function () {
	initDataModels();
    var panelN = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        bodyCls: 'alt-background',
        items: [menuPanel]
    });

    if (checkUserRole('SP_R')) {
        //**********variables**********
        var selectedPaymentId = -1;
        var selectedStudentId = -1;
        var selectedPaymentName = '';
       
        //**********stores**********
        var studentsStore = Ext.create('Ext.data.Store', {
            model: 'StudentsOperationsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_students_operations_list.php',
				extraParams: {id: -1, start_id: -1, learning_group_id: -1, learning_program_id: -1, active_only: 0, sort_by_numbers: -1, school_unit_id: (sessvars.userPrivileges.indexOf('#SP_AS#') == -1?sessvars.schoolUnitId:-1)},
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
            remoteSort: true,
            pageSize: 1000000000,
            sorters: [{
				property: 'full_name_with_group',
				direction: 'ASC'
			}]
        });
		
        studentsStore.load();

        var studentAccrualsStore = Ext.create('Ext.data.Store', {
            model: 'StudentAccrualsModel',
            remoteSort: true,
			proxy: {
				type: 'jsonp',
				url: 'AS_student_accruals_list.php',
				extraParams: {student_operation_id: -1},
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
            pageSize: 1000000000,
            sorters: [{
                    property: 'id',
                    direction: 'ASC'
                }]
        });

        var studentPaymentsStore = Ext.create('Ext.data.Store', {
            model: 'StudentPaymentsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_student_payments_list.php',
				extraParams: {student_operation_id: -1},
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
            remoteSort: true,
            pageSize: 1000000000,
            sorters: [{
                    property: 'id',
                    direction: 'ASC'
                }]
        });

        var studentTotalAccrualsStore = Ext.create('Ext.data.Store', {
            model: 'StudentTotalAccrualsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_student_total_accruals.php',
				extraParams: {student_operation_id: -1},
				simpleSortMode: true,
				reader: {
					root: 'list'
				}
			},
            remoteSort: true,
            pageSize: 1000000000
        });

        var studentTotalPaymentsStore = Ext.create('Ext.data.Store', {
            model: 'StudentTotalPaymentsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_student_total_payments.php',
				extraParams: {student_operation_id: -1},
				simpleSortMode: true,
				reader: {
					root: 'list'
				}
			},
            remoteSort: true,
            pageSize: 1000000000
        });

        var studentSaldoStore = Ext.create('Ext.data.Store', {
            model: 'StudentSaldoModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_student_saldo.php',
				extraParams: {student_operation_id: -1},
				simpleSortMode: true,
				reader: {
					root: 'list'
				}
			},			
            remoteSort: true,
            pageSize: 10
        });


        //**********combos**********
        var studentsCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Студент',
            store: studentsStore,
            queryMode: 'local',
            displayField: 'full_name_with_group',
            valueField: 'id',
            margin: '5 5 5 5',
            // anchor: '100%',
            labelWidth: 100,
            width: 500,
			matchFieldWidth: false,
            listConfig: {
                width: 500
            },
            editable: true,
            allowBlank: false,
            listeners: {
                select: function (combo, records, eOpts) {
                    selectedStudentId = studentsCombo.getValue();
                    loadStudentPayments(selectedStudentId);
                }
            }
        });

        //**********fields**********



        //**********grids**********
        var studentAccrualsGrid = Ext.create('Ext.grid.Panel', {
            store: studentAccrualsStore,
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'payment_type_name',
                    text: 'тип платежа',
                    flex: 2,
                    sortable: true
                }, {
                    dataIndex: 'value',
                    text: 'сумма',
                    flex: 2,
                    sortable: true
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: studentAccrualsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            })
        });

        var studentPaymentsGrid = Ext.create('Ext.grid.Panel', {
            store: studentPaymentsStore,
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'payment_date',
                    text: 'дата платежа',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    flex: 2
                }, {
                    dataIndex: 'payment_type_name',
                    text: 'тип платежа',
                    flex: 2
                }, {
                    dataIndex: 'value',
                    text: 'сумма',
                    flex: 2
                }, {
                    dataIndex: 'school_unit_name_short',
                    text: 'место',
                    flex: 2
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: studentPaymentsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
                        selectedPaymentId = record.data.id;
                        selectedPaymentName = record.data.payment_type_name;
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedPaymentId = record.data.id;
                        selectedPaymentName = record.data.payment_type_name;
                        editStudentPayment(record.data.id, selectedStudentId, record.data.payment_type_id, record.data.value,
                                function (id) {
                                    loadStudentPayments(selectedStudentId);
                                });
                    }
                }
            }
        });

        //**********panels**********

        var editStudentPaymentsPanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'alt-background',
            border: false,
            items: [
                {
                    xtype: 'button',
                    text: 'Добавить',
                    margin: '0 5 0 0',
                    listeners: {
                        click: function () {
                            if (selectedStudentId != -1) {
                                editStudentPayment(-1, selectedStudentId, -1, 0,
                                        function (id) {
                                            loadStudentPayments(selectedStudentId);
                                        })
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить',
                    listeners: {
                        click: function () {
                            if (selectedPaymentId != -1) {
                                deleteStudentPayment(selectedPaymentId, selectedPaymentName,
                                        function (id) {
                                            loadStudentPayments(selectedStudentId);
                                        })
                            }
                        }
                    }

                }
            ]
        });

        var studentTotalPaymentsLabel = Ext.create('Ext.form.Label', {
            frame: true,
            margin: '10 10 10 10'
        });

        var studentTotalAccrualsLabel = Ext.create('Ext.form.Label', {
            frame: true,
            margin: '10 10 10 10'
        });

        var panelP = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Учёт оплаты&nbsp;</span>'
                }
            ]
        });

        var studentSaldoLabel = Ext.create('Ext.form.Label', {
            frame: true,
            margin: '10 10 10 10'
        });

        var panelSP = Ext.create('Ext.form.Panel', {
            autoScroll: true,
            region: 'west',
            layout: 'border',
            bodyCls: 'alt-background',
            border: false,
            width: 1100,
            bodyPadding: 5,
            items: [
                Ext.create('Ext.form.Panel', {autoScroll: true,
                    region: 'north',
                    bodyCls: 'alt-background',
                    border: false,
                    bodyPadding: 5,
                    items: [
                        panelP,
                        studentsCombo,
                        studentSaldoLabel
                    ]
                }),
                Ext.create('Ext.form.Panel', {autoScroll: true,
                    region: 'center',
                    layout: 'border',
                    bodyCls: 'alt-background',
                    border: false,
                    bodyPadding: 5,
                    items: [
                        Ext.create('Ext.form.Panel', {autoScroll: true,
                            region: 'center',
                            layout: 'border',
                            bodyCls: 'alt-background',
                            border: false,
                            bodyPadding: 5,
                            items: [
                                Ext.create('Ext.form.Panel', {autoScroll: true,
                                    region: 'west',
                                    bodyCls: 'alt-background',
                                    border: false,
                                    bodyPadding: 5,
                                    width: 500,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Начисления',
                                            items: [
                                                studentTotalAccrualsLabel,
                                                studentAccrualsGrid
                                            ]
                                        }
                                    ]
                                }),
                                Ext.create('Ext.form.Panel', {autoScroll: true,
                                    region: 'west',
                                    bodyCls: 'alt-background',
                                    border: false,
                                    bodyPadding: 5,
                                    width: 500,
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Платежи',
                                            items: [
                                                studentTotalPaymentsLabel,
                                                editStudentPaymentsPanel,
                                                studentPaymentsGrid
                                            ]
                                        }
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });


        //***********functions**********

        function loadStudentPayments(id) {
            studentPaymentsStore.getProxy().extraParams = {student_operation_id: id};
            studentPaymentsStore.load();

            studentAccrualsStore.getProxy().extraParams = {student_operation_id: id};
            studentAccrualsStore.load();

            studentTotalAccrualsStore.getProxy().extraParams = {student_operation_id: id};
            studentTotalAccrualsStore.load({
                callback: function (records, operation, success) {
                    rec = studentTotalAccrualsStore.first();
                    if (rec) {
                        value = rec.get('total_accruals');
                        studentTotalAccrualsLabel.setText('<span style="font-size: 180%; color: green">&nbsp;Начислено: ' + value + '&nbsp;</span>', false);
                    } else {
                        studentTotalAccrualsLabel.setText('', false);
                    }
                }
            });

            studentTotalPaymentsStore.getProxy().extraParams = {student_operation_id: id};
            studentTotalPaymentsStore.load({
                callback: function (records, operation, success) {
                    rec = studentTotalPaymentsStore.first();
                    if (rec) {
                        value = rec.get('total_payments');
                        studentTotalPaymentsLabel.setText('<span style="font-size: 180%; color: green">&nbsp;Оплачено: ' + value + '&nbsp;</span>', false);
                    } else {
                        studentTotalPaymentsLabel.setText('', false);
                    }
                }
            });

            studentSaldoStore.getProxy().extraParams = {student_operation_id: id};
            studentSaldoStore.load({
                callback: function (records, operation, success) {
                    rec = studentSaldoStore.first();
                    if (rec) {
                        value = rec.get('saldo');
                        if (value != 0) {
                            studentSaldoLabel.setText('<span style="font-size: 180%; color: red">&nbsp;Осталось оплатить: ' + value + '&nbsp;</span>', false);
                        } else {
                            studentSaldoLabel.setText('', false);
                        }
                    } else {
                        studentSaldoLabel.setText('', false);
                    }
                }
            });
        }

        function editStudentPayment(id, student_id, payment_type_id, value, callback) {
            Ext.define("spPaymentTypes", {
                extend: 'Ext.data.Model',
                proxy: {
                    type: 'jsonp',
                    url: 'AS_student_payment_types_list.php',
                    extraParams: {start_id: -1, student_id: student_id},
                    reader: {
                        type: 'json',
                        root: 'list'
                    }
                },
                fields: [
                    {name: 'payment_type_id', type: 'int'},
                    'payment_type_name'
                ]
            });

            var spPaymentTypesStore = Ext.create('Ext.data.Store', {
                model: 'spPaymentTypes',
                listeners: {
                    'load': function () {
                        spPaymentTypesCombo.setValue(payment_type_id);
                    }
                }
            });
            spPaymentTypesStore.load();

            var spPaymentTypesCombo = Ext.create('Ext.form.ComboBox', {
                fieldLabel: 'Тип платежа',
                store: spPaymentTypesStore,
                queryMode: 'local',
                displayField: 'payment_type_name',
                valueField: 'payment_type_id',
                margin: '5 5 5 5',
                editable: false
            });

            var spValueField = Ext.create('Ext.form.field.Number', {
                fieldLabel: 'сумма',
                allowBlank: false,
                allowDecimal: true,
                margin: '5 5 5 5',
                value: value
            });


            var fieldsPanel = Ext.create('Ext.form.Panel', {autoScroll: true,
                frame: false,
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
                    spPaymentTypesCombo,
                    spValueField
                ]
            });

            var formPanel = Ext.create('Ext.form.Panel', {autoScroll: true,
                layout: 'border',
                border: false,
                items: [fieldsPanel]
            })

            function save() {

                function failSave(result, request) {
                    formPanel.body.unmask();
                    Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                }
                ;
                function doneSave(result, request) {
                    formPanel.body.unmask();
                    if (result.responseText.substr(0, 2) == 'ok') {
                        if (callback) {
                            callback(parseInt(result.responseText.substr(3)))
                        }
                        win.close();
                    } else {
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        return;
                    }
                }
                formPanel.body.mask('Сохранение...');
                Ext.Ajax.request({
                    url: 'AS_student_payment_edit.php',
                    success: doneSave,
                    failure: failSave,
                    params: {
                        id: id,
                        student_id: student_id,
                        payment_type_id: spPaymentTypesCombo.getValue(),
                        value: spValueField.getValue(),
                        user_id: sessvars.userId
                    }
                });
            }

            var win = new Ext.Window({
                title: (id == -1) ? 'Новый платёж' : 'Редактирование платежа',
                layout: 'fit',
                resizable: false,
                modal: true,
                height: 150,
                width: 400,
                items: [formPanel],
                bbar: [
                    {xtype: 'tbfill'},
                    {
                        xtype: 'button',
                        text: 'ОК',
                        width: 100,
                        listeners: {
                            render: function () {
                                this.addCls("x-btn-default-small");
                                this.removeCls("x-btn-default-toolbar-small");
                            },
                            click: function () {
                                if (spPaymentTypesCombo.getValue() == -1) {
                                    Ext.Msg.alert('Ошибка', 'Не выбран тип платежа');
                                    win.close();
                                    return;
                                } else {
                                    save();
                                }
                            }
                        }
                    }, {
                        xtype: 'button',
                        text: 'Отмена',
                        width: 100,
                        listeners: {
                            render: function () {
                                this.addCls("x-btn-default-small");
                                this.removeCls("x-btn-default-toolbar-small");
                            },
                            click: function () {
                                win.close();
                            }
                        }
                    }

                ]
            }).show();
        }

        function deleteStudentPayment(id, name, callback) {

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
                        text: 'Удалить платёж "' + name + '"?',
                        margin: '0 0 0 10'
                    }]
            });

            function del() {
                function fail(result, request) {
                    formPanel.body.unmask();
                    Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                }
                ;
                function done(result, request) {
                    formPanel.body.unmask();
                    if (result.responseText == 'ok') {
                        if (callback) {
                            callback()
                        }
                        ;
                        win.close();

                    } else {
                        Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                    }

                }
                formPanel.body.mask('Удаление...');
                Ext.Ajax.request({
                    url: 'AS_payment_delete.php',
                    success: done,
                    failure: fail,
                    params: {
                        id: id,
                        user_id: sessvars.userId
                    }
                });
            }

            var win = new Ext.Window({
                title: 'Удаление платежа.',
                layout: 'fit',
                resizable: false,
                modal: true,
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
                                del();
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
                                win.close();
                            }
                        }
                    }

                ]
            }).show();
        }

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                // panelP,
                panelSP
            ]
        });

    } else {
        var noPrivilegesPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">У вас нет доступа к просмотру данных этой страницы</span>'
                }
            ]
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                noPrivilegesPanel
            ]
        });
    }
});
