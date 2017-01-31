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

    if (checkUserRole('WB_R')) {
        //**********variables**********
        var selectedWaybillId = -1;



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

        waybillsStore.load();

        var driveLessonsCountStore = Ext.create('Ext.data.Store', {
			model: 'DriveLessonsCountModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_drive_lessons_count_list.php',
				reader: {
					root: 'list'
				},
				simpleSortMode: true
			},
			pageSize: 1000000000,
			listeners: {
				'load': function () {
					var rec = driveLessonsCountStore.first();
					if(rec){
						driveLessonsLabel.setText('<span style="font-size: 100%; background-color: yellow; color: black">&nbsp;Всего листов: '+rec.data.waybills_count+'. Всего занятий: ' + rec.data.drive_lessons_total + '. Из них: по программе - ' + rec.data.drive_lessons_program + ', город - ' + rec.data.drive_lessons_city + ', полигон - ' + rec.data.drive_lessons_polygon + ', дополнительно - ' + rec.data.drive_lessons_add + '.&nbsp;</span>', false);
					} else {
						driveLessonsLabel.setText('', false);
					}
				}
			}
		});
		driveLessonsCountStore.load();

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
					staffCombo.setValue(-1);
				}
			}
		});
		
		variablesStore.load({
			callback: function (records, operation, success) {
				var variable = variablesStore.getById('drive_lesson_discipline_id');
				var disciplineId = variable.data.value;		
				staffStore.getProxy().extraParams = {start_id: -1, active_only: 0, discipline_id: disciplineId};
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
                extraParams: {start_id: -1, active_only: 0},
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
					vehiclesCombo.setValue(-1);
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
            margin: '3 3 3 3'
        });

        var dateFromField = Ext.create('Ext.form.field.Date', {
            region: 'north',
            fieldLabel: 'с',
            labelWidth: 75,
            width: 200,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var dateTillField = Ext.create('Ext.form.field.Date', {
            region: 'north',
            fieldLabel: 'по',
            labelWidth: 75,
            width: 200,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });

        //**********grids**********
        var waybillsGrid = Ext.create('Ext.grid.Panel', {
            store: waybillsStore,
			region: 'center',
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'number',
                    text: 'номер',
                    width: 100,
                    sortable: true
                }, {
                    dataIndex: 'date',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    text: 'дата',
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'staff_initials_name',
                    text: 'инструктор',
                    width: 200,
                    sortable: true
                }, {
                    dataIndex: 'vehicle_name',
                    text: 'АМТС',
                    width: 200,
                    sortable: true
                }, {
                    dataIndex: 'odo',
                    text: 'спидометр',
                    width: 100,
                    sortable: true
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: waybillsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
                        selectedWaybillId = record.data.id;
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedWaybillId = record.data.id;
						editWaybill(record.data.id,0,function(){
							waybillsStore.reload();
							driveLessonsCountStore.reload();
						});
                    }
                }
            }
        })

		var driveLessonsLabel = Ext.create('Ext.form.Label', {
			frame: true,
			region:'south',
			margin: '10 10 10 10'
		});

        var panelW = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Путевые листы&nbsp;</span>'
                }
            ]
        });

        var editWaybillPanel = Ext.create('Ext.panel.Panel', {
            border: false,
			region: 'north',
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'button',
                    text: 'Новый путевой лист',
					disabled: !(checkUserRole('WB_A')),
                    margin: '3 3 3 3',
                    listeners: {
                        click: function () {
                           addWaybill(function(id){
									editWaybill(id,1,function(){
										waybillsStore.reload();
										driveLessonsCountStore.reload();
									})
								}
							);
                        }
                    }
                },
                {
                    xtype: 'button',
					disabled: !(checkUserRole('WB_D')),
                    text: 'Удалить путевой лист',
                    margin: '3 3 3 3',
                    listeners: {
                        click: function () {
                           deleteWaybill(selectedWaybillId,function(){
								waybillsStore.reload();
								driveLessonsCountStore.reload();
							});
                        }
                    }
                }
            ]
        });

       
		var bSearch = Ext.create('Ext.Button', {
			text: 'Применить',
			margin: '0 5 5 5',
			disabled: !checkUserRole('WB_R'),
			listeners: {
				click: function () {
					waybillsStore.getProxy().extraParams = {
						number: numberField.getValue(),
						date_from: dateFromField.getValue(),
						date_till: dateTillField.getValue(),
						staff_id: staffCombo.getValue(),
						vehicle_id: vehiclesCombo.getValue()
					};
					waybillsStore.load();
					driveLessonsCountStore.getProxy().extraParams = {
						number: numberField.getValue(),
						date_from: dateFromField.getValue(),
						date_till: dateTillField.getValue(),
						staff_id: staffCombo.getValue(),
						vehicle_id: vehiclesCombo.getValue()
					};
					driveLessonsCountStore.load();
				}
			}
		});
		
		var bFilterReset = Ext.create('Ext.Button', {
			text: 'Сбросить фильтр',
			margin: '0 5 5 5',
			disabled: !checkUserRole('WB_R'),
			listeners: {
				click: function () {
					numberField.setValue('');
					dateFromField.setValue('');
					dateTillField.setValue('');
					staffCombo.setValue(-1);
					vehiclesCombo.setValue(-1);
					waybillsStore.getProxy().extraParams = {
						number: ''
					};
					waybillsStore.load();
					driveLessonsCountStore.getProxy().extraParams = {
						number: ''
					};
					driveLessonsCountStore.load();
				}
			}
		});
		
		var filterPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            bodyCls: 'alt-background',
            id: 'filterPanel',
			layout: 'border',
			region: 'east',
			width: 400,
			collapsible: true,
			collapsed: true,
			resizable: true,
			title: 'Фильтр',
            items: [
                numberField,
				dateFromField,
				dateTillField,
				staffCombo,
				vehiclesCombo,
				{
					xtype: 'fieldcontainer',
					region: 'north',
					layout: 'hbox',
					items:[
						bSearch,
						bFilterReset
					]
				}
            ]
        });

        var waybillListPanel = Ext.create('Ext.panel.Panel', {
			layout: 'border',
			region: 'center',
            bodyCls: 'alt-background',
            id: 'waybillTabPanelListTab',
            items: [
                editWaybillPanel,
				Ext.create('Ext.panel.Panel', {
					border: false,
					bodyCls: 'alt-background',
					layout: 'border',
					region: 'center',
					items: [
						filterPanel,
						waybillsGrid,
						driveLessonsLabel
					]
				})
            ]
        });

        // var waybillTabPanelWaybillTab = Ext.create('Ext.panel.Panel', {autoScroll: true,
            // title: 'путевой лист',
            // bodyCls: 'alt-background',
            // id: 'waybillTabPanelWaybillTab',
            // items: [
                // waybillNumberField,
                // waybillDateField,
                // waybillOdoField,
                // waybillStaffCombo,
                // waybillVehiclesCombo,
                // editWaybillStudentPanel,
                // waybillStudentsGrid,
                // Ext.create('Ext.form.Panel', {autoScroll: true,
                    // bodyCls: 'alt-background',
                    // border: false,
                    // items: [
                        // {
                            // xtype: 'button',
                            // text: 'сохранить',
                            // listeners: {
                                // click: function () {
                                    // if (newWaybillId != -1) {
                                        // id = newWaybillId;
                                    // } else {
                                        // id = selectedWaybillId;
                                    // }
                                    // saveWaybillData(id
                                            // , waybillNumberField.getValue()
                                            // , waybillStaffCombo.getValue()
                                            // , waybillDateField.getValue()
                                            // , waybillOdoField.getValue()
                                            // , waybillVehiclesCombo.getValue()
                                            // , function (id) {
                                                // selectedWaybillId = id;
                                                // // waybillNumberLabel.setText('<span style="font-size: 180%; color: red">&nbsp;['+selectedWaybillNumber+']&nbsp;</span>', false) ;
                                                // newWaybillId = -1;
                                                // Ext.getCmp('waybillTabPanelListTab').enable();
                                            // });
                                // }
                            // }
                        // },
                        // {
                            // xtype: 'button',
                            // text: 'отменить',
                            // // margin: '10 10 10 10',
                            // listeners: {
                                // click: function () {
                                    // if (newWaybillId != -1) {
                                        // Ext.Ajax.request({
                                            // url: 'AS_waybill_delete.php',
                                            // params: {
                                                // id: newWaybillId,
                                                // hard_delete: 1,
                                                // user_id: sessvars.userId
                                            // }
                                        // });
                                        // newWaybillId = -1;
                                        // Ext.getCmp('waybillTabPanelListTab').enable();
                                        // Ext.getCmp('waybillTabPanelWaybillTab').disable();
                                        // waybillTabPanel.setActiveTab('waybillTabPanelListTab');
                                        // onwaybillTabPanelListTabHeaderClick();
                                    // } else {
                                        // loadWaybillData(selectedWaybillId);
                                    // }
                                // }
                            // }
                        // }
                    // ]
                // })
            // ]
        // });

        // var waybillTabPanel = Ext.create('Ext.tab.Panel', {
            // id: 'waybillTabPanel',
            // region: 'center',
            // border: false,
            // renderTo: Ext.getBody(),
            // items: [
                // waybillTabPanelListTab,
                // waybillTabPanelWaybillTab
            // ]
        // })

        // Ext.getCmp('waybillTabPanelWaybillTab').disable();

        // var onwaybillTabPanelListTabHeaderClick = function (btn, e) {
            // waybillsStore.load({
                // callback: function (records, operation, success) {
                    // var rowIndex = this.find('id', selectedWaybillId);
                    // waybillsGrid.getView().select(rowIndex);
                    // loadWaybillData(selectedWaybillId);
                // }
            // })
        // };

        // waybillTabPanelListTab.tab.on('click', onwaybillTabPanelListTabHeaderClick);

        //***********functions**********

        // function loadWaybillData(id) {
            // var waybill = waybillsStore.getById(id);
            // if (waybill) {
                // waybillNumberField.setValue(waybill.get('number'));
                // waybillDateField.setValue(waybill.get('date'));
                // waybillOdoField.setValue(waybill.get('odo'));

                // waybillStaffStore.getProxy().extraParams = {active_only: 1, practice_discipline_id: 1, start_id: -1};
                // waybillStaffStore.load({
                    // callback: function (records, operation, success) {
                        // waybillStaffCombo.setValue(waybill.get('staff_id'));
                    // }
                // });

                // waybillVehiclesStore.getProxy().extraParams = {active_only: 1, start_id: -1};
                // waybillVehiclesStore.load({
                    // callback: function (records, operation, success) {
                        // waybillVehiclesCombo.setValue(waybill.get('vehicle_id'));
                    // }
                // })

                // waybillStudentsStore.getProxy().extraParams = {waybill_id: id};
                // waybillStudentsStore.load();

            // } else {
                // clearWaybillFields();
                // Ext.getCmp('waybillTabPanelWaybillTab').disable();
                // waybillTabPanel.setActiveTab('waybillTabPanelListTab');
            // }

        // }

        // function clearWaybillFields() {
            // waybillNumberField.setValue('');
            // waybillDateField.setValue('');
            // waybillOdoField.setValue('');

            // waybillStaffStore.getProxy().extraParams = {active_only: 1, practice_discipline_id: 1, start_id: -1};
            // waybillStaffStore.load({
                // callback: function (records, operation, success) {
                    // waybillStaffCombo.setValue(-1);
                // }
            // });

            // waybillVehiclesStore.getProxy().extraParams = {active_only: 1, start_id: -1};
            // waybillVehiclesStore.load({
                // callback: function (records, operation, success) {
                    // waybillVehiclesCombo.setValue(-1);
                // }
            // })

            // waybillStudentsStore.getProxy().extraParams = {waybill_id: -1};
            // waybillStudentsStore.load();

        // }

        // function saveWaybillData(id, number, staff_id, date, odo, vehicle_id, callback) {
            // function done(result, request) {
                // waybillTabPanel.body.unmask();
                // if (result.responseText.substr(0, 2) == 'ok') {
                    // if (callback) {
                        // callback(parseInt(result.responseText.substr(3)))
                        // if (id != -1) {
                            // win.close();
                        // }
                    // }
                // } else {
                    // Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                // }
            // }
            // function fail(result, request) {
                // waybillTabPanel.body.unmask();
                // Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
            // }
            // ;
            // function save() {
                // waybillTabPanel.body.mask('Сохранение...');
                // Ext.Ajax.request({
                    // url: 'AS_waybill_edit.php',
                    // success: done,
                    // failure: fail,
                    // params: {
                        // id: id,
                        // number: number,
                        // staff_id: staff_id,
                        // date: date,
                        // odo: odo,
                        // vehicle_id: vehicle_id,
                        // user_id: sessvars.userId
                    // }
                // });
            // }

            // if (id != -1) {
                // var win = new Ext.Window({
                    // title: 'Сохранение',
                    // layout: 'fit',
                    // resizable: false,
                    // modal: true,
                    // height: 100,
                    // width: 250,
                    // items: [{
                            // xtype: 'label',
                            // forId: 'myLabel',
                            // text: 'Сохранить изменения?',
                            // margin: '0 0 0 10'
                        // }],
                    // bbar: [
                        // {xtype: 'tbfill'},
                        // {
                            // xtype: 'button',
                            // text: 'ОК',
                            // width: 100,
                            // listeners: {
                                // render: function () {
                                    // this.addCls("x-btn-default-small");
                                    // this.removeCls("x-btn-default-toolbar-small");
                                // },
                                // click: function () {
                                    // save();
                                // }
                            // }
                        // }, {
                            // xtype: 'button',
                            // text: 'Отмена',
                            // width: 100,
                            // listeners: {
                                // render: function () {
                                    // this.addCls("x-btn-default-small");
                                    // this.removeCls("x-btn-default-toolbar-small");
                                // },
                                // click: function () {
                                    // win.close();
                                    // if (selectedWaybillId != -1) {
                                        // loadWaybillData(selectedWaybillId);
                                    // }
                                // }
                            // }
                        // }
                    // ]
                // }).show();
            // } else {
                // save();
            // }
        // }

        // function editWaybillStudents(id, waybill_id, student_id, place, callback) {
            // Ext.define("StudentsResults", {
                // extend: 'Ext.data.Model',
                // proxy: {
                    // type: 'jsonp',
                    // url: 'AS_students_list.php',
                    // extraParams: {active_only: 1, start_id: -1},
                    // reader: {
                        // type: 'json',
                        // root: 'list'
                    // },
                    // pageSize: 0
                // },
                // fields: [
                    // {name: 'id', type: 'int'},
                    // 'full_name_with_group'
                // ]
            // });

            // Ext.define("PlacesResults", {
                // extend: 'Ext.data.Model',
                // fields: [
                    // 'id',
                    // 'name'
                // ]
            // });

            // var studentsStore = Ext.create('Ext.data.Store', {
                // model: 'StudentsResults',
                // listeners: {
                    // 'load': function () {
                        // wsStudentsCombo.setValue(student_id);
                    // }
                // }
            // });
            // studentsStore.load();

            // var placesStore = Ext.create('Ext.data.Store', {
                // model: 'PlacesResults',
                // data: [
                    // {id: 'город', name: 'город'},
                    // {id: 'полигон', name: 'полигон'},
                    // {id: 'дополнительно', name: 'дополнительно'}
                // ]
            // });


            // var wsStudentsCombo = Ext.create('Ext.form.ComboBox', {
                // fieldLabel: 'Студент',
                // store: studentsStore,
                // queryMode: 'local',
                // displayField: 'full_name_with_group',
                // valueField: 'id',
                // margin: '3 3 3 3',
                // editable: false
            // });

            // var wsPlacesCombo = Ext.create('Ext.form.ComboBox', {
                // fieldLabel: 'Место наката',
                // store: placesStore,
                // queryMode: 'local',
                // displayField: 'name',
                // valueField: 'id',
                // margin: '3 3 3 3',
                // editable: false
            // });

            // wsPlacesCombo.setValue(place);
            // var fieldsPanel = Ext.create('Ext.form.Panel', {autoScroll: true,
                // frame: false,
                // border: false,
                // bodyPadding: 5,
                // region: 'north',
                // bodyCls: 'alt-background',
                // fieldDefaults: {
                    // labelAlign: 'left',
                    // labelWidth: 150,
                    // anchor: '100%'
                // },
                // items: [
                    // wsStudentsCombo,
                    // wsPlacesCombo
                // ]
            // });

            // var formPanel = Ext.create('Ext.form.Panel', {autoScroll: true,
                // layout: 'border',
                // border: false,
                // items: [fieldsPanel]
            // })

            // function save() {

                // function fail(result, request) {
                    // formPanel.body.unmask();
                    // Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                // }
                // ;
                // function done(result, request) {
                    // formPanel.body.unmask();
                    // if (result.responseText.substr(0, 2) == 'ok') {
                        // if (callback) {
                            // callback(parseInt(result.responseText.substr(3)))
                        // }
                        // win.close();
                    // } else {
                        // Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        // return;
                    // }
                // }
                // formPanel.body.mask('Сохранение...');
                // Ext.Ajax.request({
                    // url: 'AS_waybills_students_edit.php',
                    // success: done,
                    // failure: fail,
                    // params: {
                        // id: id,
                        // waybill_id: waybill_id,
                        // student_id: wsStudentsCombo.getValue(),
                        // place: wsPlacesCombo.getValue(),
                        // user_id: sessvars.userId
                    // }
                // });
            // }

            // var win = new Ext.Window({
                // title: (id == -1) ? 'Новая запись в путевой лист' : 'Редактирование',
                // layout: 'fit',
                // resizable: false,
                // modal: true,
                // height: 150,
                // width: 400,
                // items: [formPanel],
                // bbar: [
                    // {xtype: 'tbfill'},
                    // {
                        // xtype: 'button',
                        // text: 'ОК',
                        // width: 150,
                        // listeners: {
                            // render: function () {
                                // this.addCls("x-btn-default-small");
                                // this.removeCls("x-btn-default-toolbar-small");
                            // },
                            // click: function () {
                                // save();
                            // }
                        // }
                    // }, {
                        // xtype: 'button',
                        // text: 'Отмена',
                        // width: 150,
                        // listeners: {
                            // render: function () {
                                // this.addCls("x-btn-default-small");
                                // this.removeCls("x-btn-default-toolbar-small");
                            // },
                            // click: function () {
                                // win.close();
                            // }
                        // }
                    // }

                // ]
            // }).show();
        // }
		function addWaybill(callback) {
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
                    url: 'AS_waybill_edit.php',
                    success: done,
                    failure: fail,
                    params: {
                        id: -1,
                        number: '',
                        staff_id: -1,
                        date: '',
                        odo: 0,
                        vehicle_id: -1,
                        user_id: sessvars.userId
                    }
                });
            }

            save();

        }

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelW,
                waybillListPanel
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
