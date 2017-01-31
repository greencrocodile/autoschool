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

    if (checkUserRole('DAY_BALANCE_R')) {
        var selectedInPaymentId = -1;
        var selectedInArticleName = '';
        var selectedOutPaymentId = -1;
        var selectedOutArticleName = '';
        //**********models**********
       
        //**********stores**********
        var variablesStore = Ext.create('Ext.data.Store', {
            model: 'VariablesModel',
			proxy: {
                type: 'jsonp',
                url: 'AS_variables_list.php',
                simpleSortMode: true,
                reader: {
                    root: 'list'
                }
            },
            remoteSort: true,
            sorters: [{
                    property: 'name',
                    direction: 'ASC'
                }]
        });
        variablesStore.load();

		var schoolUnitsStore = Ext.create('Ext.data.Store', {
            model: 'SchoolUnitsModel',
			proxy: {
                type: 'jsonp',
                url: 'AS_school_units_list.php',
                extraParams: {start_id: -1, active_only: 1, whole_as: 1, id: -1},
                simpleSortMode: true,
                reader: {
                    root: 'list',
                    totalProperty: 'total'
                }
            },
            remoteSort: true,
            pageSize: 1000000000,
            sorters: [{
				property: 'name_full',
				direction: 'ASC'
			}],
			listeners:{
				load: function(){
					schoolUnitsCombo.setValue((sessvars.userPrivileges.indexOf('#DAY_BALANCE_AS#') == -1?sessvars.schoolUnitId:-1));
				}
			}
        })
		
		
		schoolUnitsStore.getProxy().extraParams = {start_id: (sessvars.userPrivileges.indexOf('#DAY_BALANCE_AS#') == -1?0:-1), active_only: 1, whole_as: 1, id: (sessvars.userPrivileges.indexOf('#DAY_BALANCE_AS#') == -1?sessvars.schoolUnitId:-1)};
        schoolUnitsStore.load();

        var paymentsInStore = Ext.create('Ext.data.Store', {
            model: 'PaymentsInModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_payments_list.php',
				extraParams: {payment_date: '', school_unit_id: -1, article_type: 1},
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
                }],
            listeners: {
                'load': function () {
                    selectedInPaymentId = -1;
                    selectedInArticleName = '';
                }
            }
        });

        var paymentsOutStore = Ext.create('Ext.data.Store', {
            model: 'PaymentsOutModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_payments_list.php',
				extraParams: {payment_date: '', school_unit_id: -1, article_type: 0},
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
                }],
            listeners: {
                'load': function () {
                    selectedOutPaymentId = -1;
                    selectedOutArticleName = '';
                }
            }
        });

        //**********combos**********
        var schoolUnitsCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Подразделение',
            store: schoolUnitsStore,
            queryMode: 'local',
            displayField: 'name_full',
            valueField: 'id',
            margin: '5 5 5 5',
            // anchor: '100%',
            labelWidth: 100,
            width: 500,
            editable: true,
            allowBlank: false,
            listeners: {
                change: function () {
                    clearPayments();
                }
            }
        });

        //**********fields**********

        var paymentsDateField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Дата',
            labelWidth: 100,
            format: 'd.m.Y',
            margin: '5 5 5 5',
			disabled: sessvars.userPrivileges.indexOf('#DAY_BALANCE_AD#') == -1
        });

        //**********grids**********
        var paymentsInGrid = Ext.create('Ext.grid.Panel', {
            store: paymentsInStore,
			region: 'center',
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [
                {
                    dataIndex: 'article_name',
                    text: 'статья прихода',
                    flex: 2,
                    sortable: true
                }, {
                    dataIndex: 'value',
                    text: 'сумма',
                    flex: 2,
                    sortable: true
                }, {
                    dataIndex: 'comment',
                    text: 'примечание',
                    flex: 2,
                    sortable: true
                }, {
                    dataIndex: 'school_unit_name_short',
                    text: 'место',
                    flex: 2,
                    sortable: true
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: paymentsInStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
                        selectedInPaymentId = record.data.id;
                        selectedInArticleName = record.data.article_name;
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedInPaymentId = record.data.id;
                        selectedInArticleName = record.data.article_name;
                        variable = variablesStore.getById('student_payment_article_id');
						if(variable){
							if (record.data.article_id == variable.get('value')) {
								Ext.MessageBox.alert('', 'Для изменения записей об оплате воспользуйтесь страницей "Учёт оплаты обучения"', null);
							} else {
								// selectedPaymentId = record.data.id;
								// selectedPaymentName = record.data.payment_type_name;
								editPayment(record.data.id, record.data.article_type, record.data.staff_id, record.data.payment_date, record.data.school_unit_id, record.data.article_id, record.data.value, record.data.comment,
										function (id) {
											loadPayments();
										}
								);
							}
						}
                    }
                }
            }
        });

        var paymentsOutGrid = Ext.create('Ext.grid.Panel', {
            store: paymentsOutStore,
			region:'center',
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [
                {
                    dataIndex: 'article_name',
                    text: 'статья расхода',
                    flex: 2,
                    sortable: true
                }, {
                    dataIndex: 'value',
                    text: 'сумма',
                    flex: 2,
                    sortable: true
                }, {
                    dataIndex: 'comment',
                    text: 'примечание',
                    flex: 2,
                    sortable: true
                }, {
                    dataIndex: 'school_unit_name_short',
                    text: 'место',
                    flex: 2,
                    sortable: true
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: paymentsOutStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
                        selectedOutPaymentId = record.data.id;
                        selectedOutArticleName = record.data.article_name;
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedOutPaymentId = record.data.id;
                        selectedOutArticleName = record.data.article_name;
                        editPayment(record.data.id, record.data.article_type, record.data.staff_id, record.data.payment_date, record.data.school_unit_id, record.data.article_id, record.data.value, record.data.comment,
                                function (id) {
                                    loadPayments();
                                }
                        );
                    }
                }
            }
        });

        //**********buttons**********

        var bLoadPayments = Ext.create('Ext.Button', {
            text: 'Выбор',
            margin: '5 5 5 5',
            listeners: {
                click: function () {
                    loadPayments();
                }
            }
        });

        //**********panels**********

        var editPaymentsInPanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'alt-background',
			region:'north',
            border: false,
            items: [
                {
                    xtype: 'button',
                    text: 'Добавить',
                    margin: '0 5 0 0',
                    listeners: {
                        click: function () {
                            editPayment(-1, 1, -1, paymentsDateField.getValue(), schoolUnitsCombo.getValue(), -1, 0, '',
                                    function (id) {
                                        loadPayments();
                                    }
                            );
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить',
                    listeners: {
                        click: function () {
                            variable = variablesStore.getById('student_payment_article_id');
                            payment = paymentsInStore.getById(selectedInPaymentId);
                            if (payment.data.article_id == variable.get('value')) {
                                Ext.MessageBox.alert('', 'Для удаления записей об оплате воспользуйтесь страницей "Учёт оплаты обучения"', null);
                            } else {
                                deletePayment(selectedInPaymentId, selectedInArticleName,
                                        function () {
                                            loadPayments();
                                        }
                                );
                            }
                        }
                    }
                }
            ]
        });

        var editPaymentsOutPanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'alt-background',
			region:'north',
            border: false,
            items: [
                {
                    xtype: 'button',
                    text: 'Добавить',
                    margin: '0 5 0 0',
                    listeners: {
                        click: function () {
                            editPayment(-1, 0, -1, paymentsDateField.getValue(), schoolUnitsCombo.getValue(), -1, 0, '',
                                    function (id) {
                                        loadPayments();
                                    }
                            );
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить',
                    listeners: {
                        click: function () {
                            deletePayment(selectedOutPaymentId, selectedOutArticleName,
                                    function () {
                                        loadPayments();
                                    }
                            );
                        }
                    }

                }
            ]
        });

        var panelP = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Приходно-расходные операции&nbsp;</span>'
                }
            ]
        });

        var panelSP = Ext.create('Ext.form.Panel', {
            autoScroll: true,
            region: 'center',
            layout: 'border',
            bodyCls: 'alt-background',
            border: false,
            // width: 1200,
            bodyPadding: 5,
            items: [
				panelP,
				{
					xtype: 'fieldcontainer',
					region: 'north',
					layout: 'hbox',
					items: [
						schoolUnitsCombo,
						paymentsDateField,
						bLoadPayments
					]
				},
				{
					xtype: 'fieldset',
					region:'north',
					layout: 'border',
					height: 300,
					title: 'Приход, руб.',
					items: [
						editPaymentsInPanel,
						paymentsInGrid
					]
				},
				{
					xtype: 'fieldset',
					title: 'Расход, руб.',
					region:'north',
					layout: 'border',
					height: 300,
					items: [
						editPaymentsOutPanel,
						paymentsOutGrid
					]
				}
			]
		});
            



        //***********functions**********

        function clearPayments() {
            paymentsInStore.getProxy().extraParams = {payment_date: '', school_unit_id: -1, article_type: 1};
            paymentsInStore.load();

            paymentsOutStore.getProxy().extraParams = {payment_date: '', school_unit_id: -1, article_type: 0};
            paymentsOutStore.load();
        }

        function loadPayments() {
            paymentsInStore.getProxy().extraParams = {payment_date: paymentsDateField.getValue(), school_unit_id: schoolUnitsCombo.getValue(), article_type: 1};
            paymentsInStore.load();

            paymentsOutStore.getProxy().extraParams = {payment_date: paymentsDateField.getValue(), school_unit_id: schoolUnitsCombo.getValue(), article_type: 0};
            paymentsOutStore.load();
        }

        function editPayment(id, article_type, staff_id, payment_date, school_unit_id, article_id, value, comment, callback) {
            // var selectedStaffInitialsName = '';

            var staffStore = Ext.create('Ext.data.Store', {
                model: 'StaffModel',
				pageSize: 1000000000,
				proxy: {
                    type: 'jsonp',
                    url: 'AS_staff_list.php',
                    extraParams: {start_id: -1, active_only: 1},
                    reader: {
                        type: 'json',
                        root: 'list'
                    }
                },
                listeners: {
                    'load': function () {
                        staffCombo.setValue(staff_id);
                    }
                }
            });
            staffStore.load();

            var articlesStore = Ext.create('Ext.data.Store', {
                model: 'ArticlesModel',
				pageSize: 1000000000,
				proxy: {
                    type: 'jsonp',
                    url: 'AS_articles_list.php',
                    extraParams: {start_id: -1, type: article_type, without_student_payments: 1},
                    reader: {
                        type: 'json',
                        root: 'list'
                    }
                },
                listeners: {
                    'load': function () {
                        articlesCombo.setValue(article_id);
                    }
                }
            });
            articlesStore.load();

            var staffCombo = Ext.create('Ext.form.ComboBox', {
                fieldLabel: 'ИПС',
                store: staffStore,
                queryMode: 'local',
                displayField: 'initials_name',
                valueField: 'id',
                margin: '5 5 5 5',
				matchFieldWidth: false,
				listConfig: {
					width: 500
				},
                editable: false,
                hidden: (staff_id == -1)
                        // ,
                        // listeners: {
                        // 'select': function (staffCombo, records, eOpts){
                        // staff = staffStore.getById(staffCombo.getValue());
                        // selectedStaffInitialsName = staff.get('initials_name');
                        // console.log('selectedStaffInitialsName = '+selectedStaffInitialsName);
                        // }
                        // }
            });

            var articlesCombo = Ext.create('Ext.form.ComboBox', {
                fieldLabel: 'Операция',
                store: articlesStore,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                margin: '5 5 5 5',
                editable: false,
				matchFieldWidth: false,
				listConfig: {
					width: 500
				},
                listeners: {
                    'select': function (articlesCombo, records, eOpts) {
                        article = articlesStore.getById(articlesCombo.getValue());
                        if (article.data.staff_name_as_comment == 1) {
                            commentField.hide();
                            staffStore.reload();
                            staffCombo.show();
                        } else {
                            commentField.show();
                            staffCombo.hide();
                            staffCombo.setValue(-1);
                        }
                    }
                }
            });

            var valueField = Ext.create('Ext.form.field.Number', {
                fieldLabel: 'сумма',
                allowBlank: false,
                allowDecimal: true,
                margin: '5 5 5 5',
                value: value
            });

            var commentField = Ext.create('Ext.form.field.Text', {
                fieldLabel: 'примечание',
                margin: '5 5 5 5',
                hidden: (staff_id != -1),
                value: comment
            });


            var fieldsPanel = Ext.create('Ext.form.Panel', {
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
                    articlesCombo,
                    valueField,
                    commentField,
                    staffCombo
                ]
            });

            var formPanel = Ext.create('Ext.form.Panel', {
                layout: 'border',
                border: false,
                items: [fieldsPanel]
            })

            function getStaffName(id) {
                staff = staffStore.getById(id);
                return staff.data.initials_name;
            }

            function save() {

                function failSave(result, request) {
                    Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                }
                
                function doneSave(result, request) {
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
                Ext.Ajax.request({
                    url: 'AS_payment_edit.php',
                    success: doneSave,
                    failure: failSave,
                    params: {
                        id: id,
                        staff_id: staffCombo.getValue(),
                        payment_date: payment_date,
                        school_unit_id: school_unit_id,
                        article_id: articlesCombo.getValue(),
                        value: valueField.getValue(),
                        comment: (staffCombo.getValue() == -1) ? commentField.getValue() : getStaffName(staffCombo.getValue()),
                        user_id: sessvars.userId
                    }
                });
            }

            var win = new Ext.Window({
                title: (id == -1) ? 'Новая операция' : 'Редактирование операции',
                layout: 'fit',
                resizable: false,
                modal: true,
                height: 200,
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
                                if (articlesCombo.getValue() == -1) {
                                    Ext.Msg.alert('Ошибка', 'Не выбрана статья');
                                    return;
                                } else {
                                    if (!staffCombo.isHidden() && staffCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'Не выбран ИПС');
                                        return;
                                    } else {
                                        save();
                                    }
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

        function deletePayment(id, name, callback) {

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
                        text: 'Удалить операцию? "' + name + '"?',
                        margin: '0 0 0 10'
                    }]
            });

            function del() {
                function fail(result, request) {
                    Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                }
                
                function done(result, request) {
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
		
		var today = new Date();
		var dd = today.getDate();
		var mm = (today.getMonth()<10?'0':'')+(today.getMonth()+1);
		var yyyy = today.getFullYear();
		
		paymentsDateField.setValue(yyyy+'-'+mm+'-'+dd);
		

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
