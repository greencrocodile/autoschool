function editGroupStaffVehicle(id, is_new, callback) {
//*********variables**********

//**********stores**********
    var staffVehiclesStore = Ext.create('Ext.data.Store', {
        model: 'GroupStaffVehiclesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_group_staff_vehicles_list.php',
            extraParams: {id: -1},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
        },
        pageSize: 1000000000
    });

    staffVehiclesStore.getProxy().extraParams = {id:id};
    staffVehiclesStore.load({
        callback: function (records, operation, success) {
            var staffVehicle = staffVehiclesStore.getById(id);
            if (staffVehicle) {

                var vehiclesStore = Ext.create('Ext.data.Store', {
                    model: 'VehiclesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_vehicles_list.php',
                        extraParams: {start_id: -1, active_only: 1, staff_id: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            vehiclesCombo.setValue(staffVehicle.data.vehicle_id);
                        }
                    }
                });
				
				var staffStore = Ext.create('Ext.data.Store', {
                    model: 'StaffModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_list.php',
                        extraParams: {start_id: -1, active_only: 1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            staffCombo.setValue(staffVehicle.data.staff_id);
                        }
                    }
                });

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
				variablesStore.load({
					callback: function (records, operation, success) {
						var variable = variablesStore.getById('drive_lesson_discipline_id');
						staffStore.getProxy().extraParams = {start_id: -1, discipline_id: variable.data.value, active_only: 1};
						staffStore.load();
					}
				});
				
				vehiclesStore.getProxy().extraParams = {start_id: -1, active_only: 1, staff_id: staffVehicle.data.staff_id};
                vehiclesStore.load();

                var vehiclesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'АМТС',
                    store: vehiclesStore,
                    queryMode: 'local',
                    displayField: 'vehicle_name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
                });
				
				var staffCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Преподаватель',
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
					listeners: {
						select: function (combo, records, eOpts) {
							vehiclesCombo.setValue(-1);
							vehiclesStore.getProxy().extraParams = {start_id: -1, staff_id: staffCombo.getValue(), active_only: 1};
							vehiclesStore.load({
								callback: function(records, operation, success){
									vehiclesCombo.setValue(-1);
								}
							});
						}
					}
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
                        staffCombo,
						vehiclesCombo
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
                            url: 'AS_group_staff_vehicle_delete.php',
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
                        url: 'AS_group_staff_vehicle_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
							group_id: staffVehicle.data.learning_group_id,
                            staff_id: staffCombo.getValue(),
                            vehicle_id: vehiclesCombo.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новый инструктор' : 'Редактирование',
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    autoScroll: true,
                    height: 150,
                    width: 500,
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
                                    if (vehiclesCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбрано АМТС');
                                        return;
                                    } 
									if (staffCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбран инструктор');
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