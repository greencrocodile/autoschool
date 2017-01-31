function editWaybill(id, is_new, callback) {
    //**********variables**********
	
	var selectedStudentId = -1;
	
    //**********stores**********
    var waybillsStore = Ext.create('Ext.data.Store', {
		model: 'WaybillsModel',
		proxy: {
			type: 'jsonp',
			url: 'AS_waybills_list.php',
			simpleSortMode: true,
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
		remoteSort: true,
		pageSize: 100,
		sorters: [{
			property: 'date',
			direction: 'DESC'
		}]
	});

    waybillsStore.getProxy().extraParams = {id: id};
    waybillsStore.load({
        callback: function (records, operation, success) {
            var waybill = waybillsStore.getById(id);
            if (waybill) {
				var studentsStore = Ext.create('Ext.data.Store', {
					model: 'WaybillStudentsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_waybill_students_list.php',
						extraParams: {waybill_id: id},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 100,
					sorters: [{
							property: 'student_full_name',
							direction: 'ASC'
						}]
				});
				studentsStore.load();
		
				var variablesStore = Ext.create('Ext.data.Store', {
					model: 'VariablesModel',
					remoteSort: true,
					proxy: {
						type: 'jsonp',
						url: 'AS_variables_list.php',
						simpleSortMode: true,
						reader: {
							root: 'list'
						}
					},
					sorters: [{
						property: 'name',
						direction: 'ASC'
					}]
				});
			
				var staffStore = Ext.create('Ext.data.Store', {
					model: 'StaffModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_staff_list.php',
						extraParams: {start_id: -1, active_only: 1, discipline_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					sorters: [{
						property: 'initials_name',
						direction: 'ASC'
					}],
					pageSize: 1000000000,
					listeners: {
						'load': function () {
							staffCombo.setValue(waybill.data.staff_id);
						}
					}
				});
				
				variablesStore.load({
					callback: function (records, operation, success) {
						var variable = variablesStore.getById('drive_lesson_discipline_id');
						var disciplineId = variable.data.value;
						staffStore.getProxy().extraParams = {start_id: -1, active_only: is_new, discipline_id: disciplineId};
						staffStore.load();
					}
				});
				
				var staffCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Инструктор',
					region: 'north',
					store: staffStore,
					queryMode: 'local',
					displayField: 'initials_name',
					valueField: 'id',
					margin: '3 3 3 3',
					labelWidth: 150,
					width: 500,
					editable: true,
					allowBlank: true
				});

				var vehiclesStore = Ext.create('Ext.data.Store', {
					model: 'VehiclesModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_vehicles_list.php',
						extraParams: {start_id: -1, active_only: is_new},
						reader: {
							root: 'list',
							totalProperty: 'total'
						},
						simpleSortMode: true
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'vehicle_name',
						direction: 'ASC'
					}],
					listeners: {
						'load': function () {
							vehiclesCombo.setValue(waybill.data.vehicle_id);
						}
					}
				});
				vehiclesStore.load();

				var vehiclesCombo = Ext.create('Ext.form.ComboBox', {
					region: 'north',
					fieldLabel: 'АМТС',
					store: vehiclesStore,
					queryMode: 'local',
					displayField: 'vehicle_name',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					editable: false,
					allowBlank: true
				});

				//**********fields**********

				var numberField = Ext.create('Ext.form.field.Number', {
					region: 'north',
					fieldLabel: 'номер',
					labelWidth: 75,
					width: 200,
					allowDecimal: false,
					minValue: 0,
					allowBlank: true,
					margin: '3 3 3 3',
					value: waybill.data.number
				});
				
				var odoField = Ext.create('Ext.form.field.Number', {
					region: 'north',
					fieldLabel: 'Спидометр',
					labelWidth: 75,
					width: 200,
					allowDecimal: false,
					minValue: 0,
					allowBlank: true,
					margin: '3 3 3 3',
					value: waybill.data.odo
				});

				var dateField = Ext.create('Ext.form.field.Date', {
					region: 'north',
					fieldLabel: 'дата',
					labelWidth: 75,
					width: 200,
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: waybill.data.date
				});
                //**********grids**********

				var studentsGrid = Ext.create('Ext.grid.Panel', {
					store: studentsStore,
					region: 'center',
					margin: '10 0 10 0',
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					columns: [{
							dataIndex: 'student_full_name',
							text: 'ФИО студента',
							flex: 2,
							sortable: false
						}, {
							dataIndex: 'time_text',
							text: 'время',
							width: 50,
							sortable: false
						}, {
							dataIndex: 'place',
							text: 'место наката',
							width: 100,
							sortable: false
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: studentsStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					}),
					listeners: {
						itemclick: function (view, record) {
							if (record) {
								selectedStudentId = record.data.id;
							}
						},
						itemdblclick: function (view, record) {
							if (record) {
								selectedStudentId = record.data.id;
								if (staffCombo.getValue() == -1) {
									Ext.Msg.alert('Ошибка', 'Не выбран инструктор');
								} else {
									editWaybillStudent(record.data.id, 0,staffCombo.getValue(),
										function (id) {
											studentsStore.reload();
										}
									);
								}
							}
						}
					}
				})
				
				
                //**********panels**********

				
				var editStudentPanel = Ext.create('Ext.panel.Panel', {
					border: false,
					region: 'north',
					bodyCls: 'alt-background',
					items: [
						{
							xtype: 'button',
							text: 'Добавить',
							margin: '3 3 3 3',
							listeners: {
								click: function () {
									addStudent(function(id){
										if (staffCombo.getValue() == -1) {
											Ext.Msg.alert('Ошибка', 'Не выбран инструктор');
										} else {
											editWaybillStudent(id, 1, staffCombo.getValue(),
												function (id) {
													studentsStore.reload();
												}
											);
										}
									});
								}
							}
						},
						{
							xtype: 'button',
							text: 'Удалить',
							margin: '3 3 3 3',
							listeners: {
								click: function () {
									deleteWaybillStudent(selectedStudentId,function(){
										studentsStore.reload();
									})
								}
							}
						}
					]
				});
				
				

				

                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 3,
                    bodyCls: 'alt-background',
                    items: [
                        numberField,
						dateField,
						odoField,
						staffCombo,
						vehiclesCombo,
						editStudentPanel,
						studentsGrid
                    ]
                });
				
				function addStudent(callback) {
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
                            url: 'AS_waybills_students_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
								waybill_id: waybill.data.id,
								student_id: -1,
								place:-1,
								user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }
				
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
                            url: 'AS_waybill_student_delete.php',
                            success: done,
                            params: {
                                id: id,
                                hard_delete: 1,
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
                                callback()
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
                        url: 'AS_waybill_edit.php',
                        success: done,
                        failure: fail,
                        params: {
							id: id,
							number: numberField.getValue(),
							staff_id: staffCombo.getValue(),
							date: dateField.getValue(),
							odo: odoField.getValue(),
							vehicle_id: vehiclesCombo.getValue(),
							user_id: sessvars.userId
                        }
                    });
                }
				
				var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новый путевой лист' : 'Редактирование путевого листа',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    height: 500,
                    width: 500,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
							disabled: !checkUserRole('WB_E'),
                            text: 'ОК',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
                                    save()
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
                        'close': function (win) {//close( panel, eOpts )
                            delNew();
                        }
                    }
                }).show();
            }
        }
    });



}									