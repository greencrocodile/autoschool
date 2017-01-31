function editVehicle(id, is_new, callback) {
//**********variables**********
    var selectedDocumentId = -1;
//**********stores**********

    var vehiclesStore = Ext.create('Ext.data.Store', {
        model: 'VehiclesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_vehicles_list.php',
            extraParams: {id: -1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 10000000000
    });
    vehiclesStore.getProxy().extraParams = {id: id};
    vehiclesStore.load({
        callback: function (records, operation, success) {
            var vehicle = vehiclesStore.getById(id);
            if (vehicle) {
                var documentsStore = Ext.create('Ext.data.Store', {
                    model: 'DocumentsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_documents_list.php',
                        extraParams: {vehicle_id: -1, student_operation_id: -1, given_student_operation_id: -1, staff_id: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    remoteSort: true,
                    pageSize: 5,
                    sorters: [{
                            property: 'name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            selectedVehicleDocumentId = -1;
                        }
                    }
                });
                documentsStore.getProxy().extraParams = {vehicle_id: id, student_id: -1, given_student_id: -1, staff_id: -1};
                documentsStore.load();
                var staffStore = Ext.create('Ext.data.Store', {
                    model: 'StaffModel',
                    remoteSort: true,
                    pageSize: 10000000000,
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_list.php',
                        extraParams: {start_id: -1, active_only: 0},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    sorters: [{
                            property: 'initials_name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            staffCombo.setValue(vehicle.data.staff_id);
                        }
                    }
                });
                staffStore.getProxy().extraParams = {start_id: -1, active_only: 0},
                staffStore.load();
                //**********fields**********

                var staffCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'сотрудник',
                    store: staffStore,
                    queryMode: 'local',
                    displayField: 'initials_name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    editable: true,
                    pageSize: 1000,
                    width: 400
                });
                var regNumField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'рег. номер',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: vehicle.data.reg_number
                });
                var vinField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'VIN',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: vehicle.data.vin
                });
                var modelField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'модель',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: vehicle.data.model_name
                });
                var colorField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'цвет',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: vehicle.data.color_name
                });
                var yearField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'год',
                    allowBlank: true,
                    minValue: 1000,
                    maxValue: 3000,
                    margin: '5 5 5 5',
                    value: vehicle.data.year
                });
                var documentsGrid = Ext.create('Ext.grid.Panel', {
                    rowLines: true,
                    columnLines: true,
                    store: documentsStore,
					region: 'center',
                    disableSelection: false,
                    columns: [{
                            dataIndex: 'name',
                            text: 'тип',
                            width: 200,
                            sortable: true
                        }, {
                            dataIndex: 'serial',
                            text: 'серия',
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'number',
                            text: 'номер',
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'date_start',
                            text: 'выдан',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'), // H:i:s'),
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'given_by',
                            text: 'кем выдан',
                            width: 200,
                            sortable: false
                        }, {
                            dataIndex: 'code',
                            text: 'код',
                            width: 50,
                            sortable: false
                        }, {
                            dataIndex: 'date_end',
                            text: 'срок действия',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'category',
                            text: 'категория',
                            width: 50,
                            sortable: false
                        }, {
                            dataIndex: 'comment',
                            text: 'особые отметки',
                            flex: 2,
                            sortable: false
                        }
                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: documentsStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                if (checkUserRole('VEHICLES_E')) {
                                    selectedVehicleDocumentId = record.data.id;
                                    editDocument(selectedVehicleDocumentId, 0, function (id) {
										documentsStore.reload();
									});
                                }
                            }
                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedVehicleDocumentId = record.data.id;
                            }
                        }
                    }
                });
                var editVehicleDocumentPanel = Ext.create('Ext.panel.Panel', {
                    region: 'north',
                    bodyCls: 'alt-background',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            margin: '5 5 5 0',
                            disabled: !checkUserRole('VEHICLES_E'),
                            listeners: {
                                click: function () {
                                    addDocument(
										function (id) {
											editDocument(id, 1, function () {
												documentsStore.reload();
											})
										}									
									)
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            margin: '5 5 5 0',
                            disabled: !checkUserRole('VEHICLES_E'),
                            listeners: {
                                click: function () {

                                    deleteDocument(selectedVehicleDocumentId, function () {
                                        documentsStore.reload();
                                    });
                                }
                            }
                        }
                    ]
                });
                var fieldsPanel = Ext.create('Ext.panel.Panel', {
                    border: false,
                    region: 'north',
                    bodyCls: 'alt-background',
                    items: [
                        modelField,
                        regNumField,
                        vinField,
                        colorField,
                        yearField,
                        staffCombo
                    ]
                });
                var documentsPanel = Ext.create('Ext.panel.Panel', {
                    border: false,
                    region: 'center',
                    bodyCls: 'alt-background',
                    layout: 'border',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Документы АМТС',
							layout: 'border',
                            region: 'center',
                            items: [
                                editVehicleDocumentPanel,
                                documentsGrid
                            ]
                        }

                    ]
                });
                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 5,
                    bodyCls: 'alt-background',
                    items: [
                        fieldsPanel,
                        documentsPanel
                    ]
                });
				function addDocument(callback) {
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
                            url: 'AS_document_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
								type_id: -1,
								serial: '',
								number: '',
								given_by: '',
								date_start: '',
								date_end: '',
								code: '',
								category: '',
								comment: '',
								vehicle_id: vehicle.data.id,
								student_operation_id: -1,
								given_student_operation_id: -1,
								staff_id: -1,
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
                            url: 'AS_vehicle_delete.php',
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
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>РПопробуйте повторить операцию.');
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
                            return;
                        }
                    }
                    formPanel.body.mask('Сохранение...');
                    Ext.Ajax.request({
                        url: 'AS_vehicle_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            model: modelField.getValue(),
                            reg_number: regNumField.getValue(),
                            year: yearField.getValue(),
                            vin: vinField.getValue(),
                            color: colorField.getValue(),
                            staff_id: staffCombo.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новое АМТС' : 'Редактирование АМТС',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    autoScroll: true,
                    height: 500,
                    width: 1000,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
							disabled: !checkUserRole('VEHICLES_E'),
                            text: 'ОК',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {

                                    if (modelField.getValue() == '') {
                                        Ext.Msg.alert('Ошибка', 'не выбрана модель');
                                        return;
                                    }
                                    if (regNumField.getValue() == '') {
                                        Ext.Msg.alert('Ошибка', 'не введён регистрационный номер');
                                        return;
                                    }
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
                        'close': function (win) {
                            delNew();
                        }
                    }
                }).show();
            }
        }
    });
}