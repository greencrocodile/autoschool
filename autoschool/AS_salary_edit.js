function editStaffSalary(staff_id, salary_month, salary_year, callback) {
    //**********variables**********
    var selectedSalaryDetailsInId = -1;
	var selectedSalaryDetailsOutId = -1;
    //**********stores**********
    var salaryStore = Ext.create('Ext.data.Store', {
        model: 'SalaryModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_salary_list.php',
            extraParams: {staff_id: -1, salary_month: 0, salary_year: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });

    salaryStore.getProxy().extraParams = {staff_id: staff_id, salary_month: salary_month, salary_year: salary_year};
    salaryStore.load({
        callback: function (records, operation, success) {
            var salary = salaryStore.getById(staff_id);
            if (salary) {
                var salaryDetailsInStore = Ext.create('Ext.data.Store', {
                    model: 'SalaryDetailsInModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_staff_salary_details_in_list.php',
						simpleSortMode: true,
						extraParams: {staff_id: -1,salary_month: -1,salary_year: -1},
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
                    remoteSort: true,
                    pageSize: 10,
                    sorters: [{
                            property: 'full_name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            selectedSalaryDetailsInId = -1;
                        }
                    }
                });

                salaryDetailsInStore.getProxy().extraParams = {staff_id: staff_id,salary_month: salary_month,salary_year: salary_year};
                salaryDetailsInStore.load();
				
                var salaryDetailsOutStore = Ext.create('Ext.data.Store', {
                    model: 'SalaryDetailsOutModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_staff_salary_details_out_list.php',
						simpleSortMode: true,
						extraParams: {staff_id: -1,salary_month: -1,salary_year: -1},
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
                    remoteSort: true,
                    pageSize: 10,
                    sorters: [{
                            property: 'full_name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            selectedSalaryDetailsOutId = -1;
                        }
                    }
                });

                salaryDetailsOutStore.getProxy().extraParams = {staff_id: staff_id,salary_month: salary_month,salary_year: salary_year};
                salaryDetailsOutStore.load();


                //**********fields**********

                
                //**********grids**********

        var salaryDetailsInGrid = Ext.create('Ext.grid.Panel', {
            store: salaryDetailsInStore,
            margin: '10 0 10 0',
			region: 'center',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'article_name',
                    text: 'статья',
                    flex:1,
                    sortable: false
                }, {
                    dataIndex: 'learning_program_name_short',
                    text: 'программа',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'value',
                    text: 'ставка',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'amount',
                    text: 'кол-во',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'coefficient',
                    text: 'коэффициент',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'total',
                    text: 'сумма',
                    width: 100,
                    sortable: false
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: salaryDetailsInStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemdblclick: function (view, record) {
                    if (record) {
						if (checkUserRole('SALARY_E')) {
							selectedSalaryDetailsInId = record.data.id;
							editSalaryDetailIn(record.data.id, 0, 
								function () {
									salaryDetailsInStore.reload();
								}
							)
                        }
                    }
                },
				itemclick: function (view, record) {
                    if (record) {
                        selectedSalaryDetailsInId = record.data.id;
                    }
                }
            }
        })

        var salaryDetailsOutGrid = Ext.create('Ext.grid.Panel', {
            store: salaryDetailsOutStore,
			region: 'center',
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'article_name',
                    text: 'статья',
                    flex: 1,
                    sortable: false
                }, {
                    dataIndex: 'value',
                    text: 'ставка',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'amount',
                    text: 'кол-во',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'coefficient',
                    text: 'коэффициент',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'total',
                    text: 'сумма',
                    width: 100,
                    sortable: false
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: salaryDetailsOutStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemdblclick: function (view, record) {
                    if (record) {
                        if (checkUserRole('SALARY_E')) {
							selectedSalaryDetailsOutId = record.data.id;
							editSalaryDetailOut(record.data.id, 0, 
								function () {
									salaryDetailsOutStore.reload();
								}
							)
                        }
                    }
                },
				itemclick: function (view, record) {
                    if (record) {
                        selectedSalaryDetailsOutId = record.data.id;
                    }
                }
            }

        })

        // **********panels**********
        var editSalaryDetailsInPanel = Ext.create('Ext.panel.Panel', {
            border: false,
			region: 'north',
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'button',
                    text: 'Добавить',
                    margin: '5 5 5 5',
                    disabled: !checkUserRole('SALARY_E'),
                    listeners: {
                        click: function () {
                            addSalaryDetail(
								function (id) {
									editSalaryDetailIn(id, 1, function () {
										salaryDetailsInStore.reload();
									})
								}
							)
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить',
                    disabled: !checkUserRole('SALARY_E'),
                    margin: '5 5 5 5',
					listeners: {
                        click: function () {
                            deleteSalaryDetailIn(selectedSalaryDetailsInId,
								function () {
									salaryDetailsInStore.reload();
								}
							)
                        }
                    }
                }
            ]
        });

        var editSalaryDetailsOutPanel = Ext.create('Ext.panel.Panel', {
            border: false,
			region: 'north',
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'button',
                    text: 'Добавить',
                    disabled: !checkUserRole('SALARY_E'),
                    margin: '5 5 5 5',
                    listeners: {
                        click: function () {
                           addSalaryDetail(
								function (id) {
									editSalaryDetailOut(id, 1, function () {
										salaryDetailsOutStore.reload();
									})
								}
							)
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить',
                    disabled: !checkUserRole('SALARY_E'),
                    margin: '5 5 5 5',
					listeners: {
                        click: function () {
                            deleteSalaryDetailOut(selectedSalaryDetailsOutId,
								function () {
									salaryDetailsOutStore.reload();
								}
							)
                        }
                    }
                }
            ]
        });

                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 5,
                    bodyCls: 'alt-background',
                    items: [
						// {
							// xtype: 'fieldcontainer',
							// region: 'north',
							// layout: 'hbox',
							// items: [
								
								// {
									// xtype: 'button',
									// text: 'ИПС',
									// disabled: !checkUserRole('STAFF_R'),
									// listeners: {
										// click: function () {
											// editStaff(staff_id, 0, function(){})
										// }
									// }
								// }

							// ]
						// },
						{
							xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 250,
							title: 'Начисления',
							items: [
								editSalaryDetailsInPanel,
								salaryDetailsInGrid
							]
						},
						{
							xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 250,
							title: 'Вычеты',
							items: [
								editSalaryDetailsOutPanel,
								salaryDetailsOutGrid
							]
						}
                    ]
                });

                function addSalaryDetail(callback) {
                    function done(result, request) {
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback(parseInt(result.responseText.substr(3)))
                            }
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        }
                    }
                    function fail(result, request) {
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                    }

                    function save() {
                        Ext.Ajax.request({
							url: 'AS_salary_detail_edit.php',
							success: done,
							failure: fail,
							params: {
								id: -1,
								salary_month: salary_month,
								salary_year: salary_year,
								staff_id: staff_id,
								article_id_in: -1,
								article_id_out: -1,
								value: 0,
								amount: 1,
								coefficient: 1,
								learning_program_id: -1,
								user_id: sessvars.userId
							}
						});
                    }

                    save();

                }

                
                               

                

                var win = new Ext.Window({
                    title: 'Редактирование',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    autoScroll: true,
                    height: 600,
                    width: 1000,
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
									win.close();
                                    if (callback) {callback();}
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
                                }
								,
                                click: function () {
                                    win.close();
                                }
                            }
                        }

                    ]
					
                }).show();
            }
        }
    });



}									