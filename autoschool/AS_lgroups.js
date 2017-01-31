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

    if (checkUserRole('LG_R')) {

        //**********variables**********
        var selectedLGroupId = -1;
      

        var lGroupsStore = Ext.create('Ext.data.Store', {
            model: 'LGroupsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_lgroups_list.php',
				extraParams: {active_only: 1, school_unit_id: -1},
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
			pageSize: 1000000000,
            remoteSort: true,
            sorters: [{
				property: 'date_start',
				direction: 'DESC'
			}]
        });

        
        var lGroupsGrid = Ext.create('Ext.grid.Panel', {
            store: lGroupsStore,
			region: 'center',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'number',
                    text: 'номер',
                    width: 100,
                    sortable: true
                }, {
                    dataIndex: 'school_unit_name_short',
                    text: 'место',
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'date_start',
                    text: 'начало',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'date_end',
                    text: 'окончание',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'theory_exam_date',
                    text: 'теория',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'practice_exam_date',
                    text: 'вождение',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'gibdd_exam_date',
                    text: 'ГИБДД',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'learning_program_name_full',
                    text: 'программа обучения',
                    flex: 2,
                    sortable: true
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: lGroupsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
                        selectedLGroupId = record.data.id;
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedLGroupId = record.data.id;
						editLGroup(selectedLGroupId, 0, function(){
							lGroupsStore.reload();
						})
                    }
                }
            }
        });

       
        var editLGroupsPanel = Ext.create('Ext.panel.Panel', {
            border: false,
			region: 'north',
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'button',
                    // text: 'Новая учебная группа',
					iconCls: 'add-img',
                    margin: '3 3 3 3',
                    listeners: {
                        click: function () {
                            addLGroup(
								function (id) {
									editLGroup(id, 1,
										function () {
											lGroupsStore.reload();
										})
								}
                            )
                        }
                    }
                },
                {
                    xtype: 'button',
                    // text: 'Удалить учебную группу',
					iconCls: 'delete-img',
                    margin: '3 3 3 3',
					listeners: {
						click: function () {
                            deleteLGroup(selectedLGroupId, function () {
                                lGroupsStore.reload();
                            })
                        }
					}
                },
                {
                    xtype: 'button',
                    // text: 'Документы',
					iconCls: 'doc-img',
                    margin: '3 3 3 3',
					listeners: {
						click: function () {
							if (selectedLGroupId != -1){
								exportDocuments(selectedLGroupId,-1,-1,null,-1,-1,-1,-1,-1,'learning_groups_documents', function () {})
							}
                        }
					}
                }
            ]
        });

        var panelG = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Учебные группы&nbsp;</span>'
                }
            ]
        });

		// программа обучения
		// начало обучения с по
		// окончание обучения с по
		// дата сдачи теории с по
		// дата сдачи вождения с по
		// дата экзамена гибдд с по
		// место занятий
		
		var lProgramsStore = Ext.create('Ext.data.Store', {
            model: 'LProgramsModel',
				proxy: {
				type: 'jsonp',
				url: 'AS_lprograms_list.php',
				extraParams: {start_id: -1, active_only: 0, learning_program_type: 0},
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
			pageSize: 1000000000,
            remoteSort: true,
            sorters: [{
				property: 'name_full',
				direction: 'DESC'
			}],
			listeners: {
				load: function(){
					lProgramsCombo.setValue(-1);
				}
			}
        });
		lProgramsStore.load();
		
		var schoolUnitsStore  = Ext.create('Ext.data.Store', {
            model: 'SchoolUnitsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_school_units_list.php',
				extraParams: {start_id: -1, active_only: 0, whole_as: 0},
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
			pageSize: 1000000000,
            remoteSort: true,
            sorters: [{
				property: 'name_full',
				direction: 'DESC'
			}],
			listeners: {
				load: function(){
					schoolUnitsCombo.setValue((sessvars.userPrivileges.indexOf('#LG_AS#') == -1?sessvars.schoolUnitId:-1));
				}
			}
        });
		schoolUnitsStore.getProxy().extraParams = {start_id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?0:-1), active_only: 0, whole_as: 0, id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:-1)};
		schoolUnitsStore.load();
        		
        var numberField = Ext.create('Ext.form.field.Text', {
            fieldLabel: '№ группы',
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });
		
		var startDateFromField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'с',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var startDateTillField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'по',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var endDateFromField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'с',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var endDateTillField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'по',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });

		var theoryDateFromField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'с',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var theoryDateTillField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'по',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var practiceDateFromField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'с',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var practiceDateTillField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'по',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var gibddDateFromField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'с',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var gibddDateTillField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'по',
			region: 'north',
			startDay: 1,
            labelAlign: 'right',
			labelWidth: 30,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		
		var schoolUnitsCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Подразделение',
			region: 'north',
            store: schoolUnitsStore,
            queryMode: 'local',
            displayField: 'name_full',
            valueField: 'id',
            margin: '3 3 3 3',
            labelWidth: 100,
            width: 500,
			matchFieldWidth: false,
			listConfig: {
				width: 500
			},
            editable: true,
            allowBlank: true
		});
		
		var lProgramsCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Программа обучения',
			region: 'north',
            store: lProgramsStore,
            queryMode: 'local',
            displayField: 'name_full',
            valueField: 'id',
            margin: '3 3 3 3',
            labelWidth: 100,
            width: 500,
			matchFieldWidth: false,
			listConfig: {
				width: 500
			},
            editable: true,
            allowBlank: true
		});

		
		var bSearch = Ext.create('Ext.Button', {
			text: 'Применить',
			margin: '0 5 5 5',
			disabled: !checkUserRole('LG_R'),
			listeners: {
				click: function () {

						lGroupsStore.getProxy().extraParams = {
							start_id: 0, 
							active_only: 1, 
							group_number : numberField.getValue(),
							learning_program_id: lProgramsCombo.getValue(),
							school_unit_id: (sessvars.userPrivileges.indexOf('#LG_AS#') == -1?sessvars.schoolUnitId:schoolUnitsCombo.getValue()),
							date_start_from: startDateFromField.getValue(),
							date_start_till: startDateTillField.getValue(),
							date_end_from: endDateFromField.getValue(),
							date_end_till: endDateTillField.getValue(),
							theory_exam_date_from: theoryDateFromField.getValue(),
							theory_exam_date_till: theoryDateTillField.getValue(),
							practice_exam_date_from: practiceDateFromField.getValue(),
							practice_exam_date_till: practiceDateTillField.getValue(),
							gibdd_exam_date_from: gibddDateFromField.getValue(),
							gibdd_exam_date_till: gibddDateTillField.getValue(),
						};
						lGroupsStore.load();
					
				}
			}
		});
		
		var bFilterReset = Ext.create('Ext.Button', {
			text: 'Сбросить фильтр',
			margin: '0 5 5 5',
			disabled: !checkUserRole('LG_R'),
			listeners: {
				click: function () {
					numberField.setValue('');
					startDateFromField.setValue('');
					startDateTillField.setValue('');
					endDateFromField.setValue('');
					endDateTillField.setValue('');
					theoryDateFromField.setValue('');
					theoryDateTillField.setValue('');
					practiceDateFromField.setValue('');
					practiceDateTillField.setValue('');
					gibddDateFromField.setValue('');
					gibddDateTillField.setValue('');
					schoolUnitsCombo.setValue((sessvars.userPrivileges.indexOf('#LG_AS#') == -1?sessvars.schoolUnitId:-1));
					lProgramsCombo.setValue(-1);
					lGroupsStore.getProxy().extraParams = {start_id: 0, active_only: 1, school_unit_id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:-1)};
					lGroupsStore.load();
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
			    lProgramsCombo,
				{
					xtype: 'fieldset',
					title: 'Начало обучения',
					region: 'north',
					layout: 'hbox',
					items: [
						startDateFromField,
						startDateTillField
					]
				},
				{
					xtype: 'fieldset',
					title: 'Окончание обучения',
					region: 'north',
					layout: 'hbox',
					items: [
						endDateFromField,
						endDateTillField
					]
				},
				{
					xtype: 'fieldset',
					title: 'Дата сдачи теории',
					region: 'north',
					layout: 'hbox',
					items: [
						theoryDateFromField,
						theoryDateTillField
					]
				},
				{
					xtype: 'fieldset',
					title: 'Дата сдачи вождения',
					region: 'north',
					layout: 'hbox',
					items: [
						practiceDateFromField,
						practiceDateTillField
					]
				},
				{
					xtype: 'fieldset',
					title: 'Дата экзамена ГИБДД',
					region: 'north',
					layout: 'hbox',
					items: [
						gibddDateFromField,
						gibddDateTillField
					]
				},
				schoolUnitsCombo,
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

        var groupsListPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            bodyCls: 'alt-background',
            id: 'groupsListPanel',
			layout: 'border',
			region: 'center',
            items: [
                editLGroupsPanel,
				Ext.create('Ext.panel.Panel', {
					border: false,
					bodyCls: 'alt-background',
					layout: 'border',
					region: 'center',
					items: [
						filterPanel,
						lGroupsGrid
					]
				})
            ]
        });

       


        lGroupsStore.getProxy().extraParams = {start_id: 0, active_only: 1, school_unit_id: (sessvars.userPrivileges.indexOf('#LG_AS#') == -1?sessvars.schoolUnitId:-1)};
        lGroupsStore.load();


        
		function addLGroup(callback) {
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
					url: 'AS_lgroup_edit.php',
					success: done,
					failure: fail,
					params: {
						id: -1,
						learning_program_id: -1,
						school_unit_id: -1,
						gibdd_reg_staff_id: -1,
						number: '',
						date_start: '',
						date_end: '',
						reg_order_number: '',
						reg_order_date: '',
						gibdd_reg_order_number: '',
						gibdd_reg_order_date: '',
						theory_exam_date: '',
						practice_exam_date: '',
						gibdd_exam_date: '',
						price: -1,
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
                panelG,
                groupsListPanel
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
