
function editWaybillStudent(id, is_new, staff_id, callback) {

   var waybillStudentsStore = Ext.create('Ext.data.Store', {
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
	waybillStudentsStore.getProxy().extraParams = {id: id};
    waybillStudentsStore.load({
        callback: function (records, operation, success) {

            var waybillStudent = waybillStudentsStore.getById(id);
            if (waybillStudent) {
				var studentsStore = Ext.create('Ext.data.Store', {
                    model: 'StudentsOperationsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_students_operations_list.php',
                        extraParams: {start_id: -1, active_only: 1,staff_id: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            studentsCombo.setValue(waybillStudent.data.student_operation_id);
                        }
                    }
                });
				if (is_new == 1){
					studentsStore.getProxy().extraParams = {start_id: -1, active_only: 1, staff_id: (staff_id == -1)?waybillStudent.data.staff_id:staff_id};
				} else {
					studentsStore.getProxy().extraParams = {start_id: -1, active_only: 0};
				}
				studentsStore.load();		
				
				var placesStore = Ext.create('Ext.data.Store', {
					model: 'PlacesModel',
					data: [
						{id: -1, name: '-----'},
						{id: 1, name: 'город'},
						{id: 2, name: 'полигон'},
						{id: 3, name: 'дополнительно'}
					]
				});
				
                var studentsCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Студент',
                    store: studentsStore,
                    queryMode: 'local',
                    displayField: 'full_name_with_group',
                    valueField: 'id',
                    margin: '3 3 3 3',
                    editable: false,
					matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    }
                });
				
				var placesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Место наката',
                    store: placesStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '3 3 3 3',
                    editable: false,
					matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    }
                });
				placesCombo.setValue(waybillStudent.data.place_id);

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
                        studentsCombo,
                        placesCombo
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
                            url: 'AS_waybill_student_delete.php',
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
                        url: 'AS_waybills_students_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
							waybill_id: waybillStudent.data.waybill_id,
                            student_id: studentsCombo.getValue(),
							place: placesCombo.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новый накат' : 'Редактирование наката',
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
                                    if (placesCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'Не выбрано место');
                                        return;
                                    }
                                    if (studentsCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'Не выбран студент');
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