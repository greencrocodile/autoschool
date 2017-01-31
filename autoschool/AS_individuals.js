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

    if (checkUserRole('I_R')) {

        //**********variables**********
        var selectedStudentOperationId = -1;
      

        var lProgramsStore = Ext.create('Ext.data.Store', {
            model: 'LProgramsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_lprograms_list.php',
				extraParams: {start_id: 0, active_only: 0, id: 0,learning_program_type: 0},
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
				direction: 'ASC'
			}]
        });

		lProgramsStore.getProxy().extraParams = {start_id: -1, active_only: 0, learning_program_type: 1};
		lProgramsStore.load();
		
		var studentsStore = Ext.create('Ext.data.Store', {
            model: 'StudentsOperationsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_students_operations_list.php',
				extraParams: {id: -1, start_id: -1, learning_group_id: -1, learning_program_id: -1, active_only: 1, sort_by_numbers: 1, school_unit_id: -1},
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
			pageSize: 1000000000,
            remoteSort: true,
            sorters: [{
				property: 'full_name',
				direction: 'ASC'
			}]
        });
		
		var lProgramsCombo = Ext.create('Ext.form.ComboBox', {
			fieldLabel: 'Программа',
			region: 'north',
			store: lProgramsStore,
			queryMode: 'local',
			displayField: 'name_full',
			valueField: 'id',
			margin: '3 3 3 3',
			anchor: '100%',
			editable: false,
			listeners: {
				select: function (combo, records, eOpts) {
					studentsStore.getProxy().extraParams = {learning_program_id: (lProgramsCombo.getValue() == -1)?-2:lProgramsCombo.getValue(), school_unit_id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:-1)};
					studentsStore.load();
				}
			}
		});
		
		
        
        var studentsGrid = Ext.create('Ext.grid.Panel', {
			store: studentsStore,
			disableSelection: false,
			rowLines: true,
			columnLines: true,
			region:'center',
			columns: [
				{
					dataIndex: 'date_start',
					text: 'начало',
					renderer: Ext.util.Format.dateRenderer('d.m.Y'),
					width: 70,
					sortable: false
				}, {
					dataIndex: 'lastname',
					text: 'фамилия',
					width: 150,
					sortable: false
				}, {
					dataIndex: 'firstname',
					text: 'имя',
					width: 150,
					sortable: false
				}, {
					dataIndex: 'middlename',
					text: 'отчество',
					width: 150,
					sortable: false
				}, {
					dataIndex: 'birthdate',
					text: 'д.р.',
					renderer: Ext.util.Format.dateRenderer('d.m.Y'),
					width: 70,
					sortable: false
				}, {
					dataIndex: 'school_unit_name_short',
					text: 'место',
					width: 50,
					sortable: false
				}, {
					dataIndex: 'phone_home',
					text: 'т. домашний',
					width: 150,
					sortable: false
				}, {
					dataIndex: 'phone_cell',
					text: 'т. мобильный',
					width: 150,
					sortable: false
				}, {
					dataIndex: 'phone_work',
					text: 'т. рабочий',
					width: 150,
					sortable: false
				}, {
					dataIndex: 'staff_name',
					text: 'Инструктор',
					width: 150,
					sortable: false
				}, {
					dataIndex: 'status_name',
					text: 'статус',
					width: 150,
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
						selectedStudentOperationId = record.data.id;
						// studentNameLabel.setText('<span style="font-size: 180%; color: red">&nbsp;[' + record.data.initials_name + ']&nbsp;</span>', false);
					}
				},
				itemdblclick: function (view, record) {
					if (record) {
						if (checkUserRole('FL_CARD_R')) {
							selectedStudentOperationId = record.data.id;
							// studentNameLabel.setText('<span style="font-size: 180%; color: red">&nbsp;[' + record.data.initials_name + ']&nbsp;</span>', false);
							editStudent(selectedStudentOperationId,0,function(){
								studentsStore.reload();
							})
						}
					}
				}
			}
		});

       
       var bAddStudent = Ext.create('Ext.Button',{
			text: 'Новый студент',
			disabled: !checkUserRole('FL_CARD_A'),
			margin: '3 3 3 3',
			listeners: {
				click: function () {
					addStudent(function(id){
						editStudent(id,1,function(){
							studentsStore.reload();
						})
					});
				}
			}
		});
		
		var bDeleteSudent = Ext.create('Ext.Button',{
			text: 'Удалить студента',
			disabled: !checkUserRole('FL_CARD_D'),
			margin: '3 3 3 3',
			listeners: {
				click: function () {
					deleteStudent(selectedStudentOperationId,function(){
						studentsStore.reload();
					})
				}
			}
		});
		
		var editStudentsPanel = Ext.create('Ext.panel.Panel', {
			border: false,
			region: 'north',
			bodyCls: 'alt-background',
			items: [
				bAddStudent,
				bDeleteSudent,
                {
                    xtype: 'button',
                    // text: 'Документы',
					iconCls: 'doc-img',
                    margin: '3 3 3 3',
					listeners: {
						click: function () {
							if (selectedStudentOperationId != -1){
								exportDocuments(-1,-1,selectedStudentOperationId,null,-1,-1,-1,-1,-1,'individual_documents#'+lProgramsCombo.getValue(), function () {})
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
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Индивидуальное обучение&nbsp;</span>'
                }
            ]
        });

		// фамилия
		var lastnameField = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'фамилия',
			labelWidth: 150,
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });
		// имя
		var firstnameField = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'имя',
			labelWidth: 150,
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });
		// отчество
		var middlenameField = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'отчество',
			labelWidth: 150,
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });
		// дата рождения больше
		var birthdateFromField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'дата рождения больше',
			region: 'north',
			startDay: 1,
			labelWidth: 150,
            format: 'd.m.Y',
            margin: '3 3 3 3'
        });
		// телефон домашний
		var phoneHomeField = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'телефон домашний',
			labelWidth: 150,
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });
		// телефон рабочий
		var phoneWorkField = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'телефон рабочий',
			labelWidth: 150,
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });
		// телефон мобильный
		var phoneCellField = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'телефон мобильный',
			labelWidth: 150,
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });
		// № карточки наката
		var cardNumberField = Ext.create('Ext.form.field.Text', {
            fieldLabel: '№ карточки наката',
			labelWidth: 150,
			region: 'north',
            allowBlank: true,
            margin: '3 3 3 3'
        });

		// статус
		var statusesStore = Ext.create('Ext.data.Store', {
			model: 'StatusesModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_statuses_list.php',
				extraParams: {start_id: -1},
				reader: {
					root: 'list',
					totalProperty: 'total'
				},
				simpleSortMode: true
			},
			remoteSort: true,
			pageSize: 1000000000,
			sorters: [{
				property: 'name',
				direction: 'ASC'
			}],
			listeners: {
				load: function(){
					statusesCombo.setValue(-1);
				}
			}
		});
		
		statusesStore.getProxy().extraParams = {start_id: -1};
		statusesStore.load();
				
		var statusesCombo = Ext.create('Ext.form.ComboBox', {
			fieldLabel: 'статус',
			labelWidth: 150,
			region: 'north',
			store: statusesStore,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			margin: '3 3 3 3',
			editable: false
		});

		// инструктор		
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
				staffStore.getProxy().extraParams = {start_id: -1, active_only: 1, discipline_id: disciplineId};
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
				
		var schoolUnitsStore  = Ext.create('Ext.data.Store', {
            model: 'SchoolUnitsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_school_units_list.php',
				extraParams: {start_id: -1, active_only: 0, whole_as: 0, id: -1},
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
					schoolUnitsCombo.setValue((sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:-1));
				}
			}
        });
		schoolUnitsStore.getProxy().extraParams = {start_id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?0:-1), active_only: 0, whole_as: 0, id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:-1)};
		schoolUnitsStore.load();
		
		var schoolUnitsCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Подразделение',
			region: 'north',
            store: schoolUnitsStore,
            queryMode: 'local',
            displayField: 'name_full',
            valueField: 'id',
            margin: '3 3 3 3',
			labelWidth: 150,
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
			disabled: !checkUserRole('I_R'),
			listeners: {
				click: function () {
					studentsStore.getProxy().extraParams = {
						learning_program_id: (lProgramsCombo.getValue() == -1)?-2:lProgramsCombo.getValue(),
						firstname: firstnameField.getValue(),
						middlename: middlenameField.getValue(),
						lastname: lastnameField.getValue(),
						staff_id: staffCombo.getValue(),
						school_unit_id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:schoolUnitsCombo.getValue()),
						birthdate_from: birthdateFromField.getValue(),
						phone_work: phoneWorkField.getValue(),
						phone_cell: phoneCellField.getValue(),
						phone_home: phoneHomeField.getValue(),
						card_number: cardNumberField.getValue(),
						status_id: statusesCombo.getValue()
					};
					studentsStore.load();
				}
			}
		});
		
		var bFilterReset = Ext.create('Ext.Button', {
			text: 'Сбросить фильтр',
			margin: '0 5 5 5',
			disabled: !checkUserRole('I_R'),
			listeners: {
				click: function () {
				
					firstnameField.setValue('');
					middlenameField.setValue('');
					lastnameField.setValue('');
					staffCombo.setValue(-1);
					schoolUnitsCombo.setValue((sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:-1));
					birthdateFromField.setValue('');
					phoneWorkField.setValue('');
					phoneCellField.setValue('');
					phoneHomeField.setValue('');
					cardNumberField.setValue('');
					statusesCombo.setValue(-1);
					studentsStore.getProxy().extraParams = {learning_program_id: (lProgramsCombo.getValue() == -1)?-2:lProgramsCombo.getValue(),school_unit_id: (sessvars.userPrivileges.indexOf('#FL_CARD_AS#') == -1?sessvars.schoolUnitId:-1)};
					studentsStore.load();
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
                lastnameField,
				firstnameField,
				middlenameField,
				birthdateFromField,
				phoneHomeField,
				phoneCellField,
				phoneWorkField,
				staffCombo,
				cardNumberField,
				statusesCombo,
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

        var studentsListPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            bodyCls: 'alt-background',
            id: 'studentsListPanel',
			layout: 'border',
			region: 'center',
            items: [
				lProgramsCombo,
                editStudentsPanel,
				Ext.create('Ext.panel.Panel', {
					border: false,
					bodyCls: 'alt-background',
					layout: 'border',
					region: 'center',
					items: [
						filterPanel,
						studentsGrid
					]
				})
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
					url: 'AS_student_edit.php',
					success: done,
					failure: fail,
					params: {
						id: -1,
						student_id: 0,
						firstname: '',
						middlename: '',
						lastname: '',
						birthdate: '',
						birthplace: '',
						gender_id: '1',
						addr_index: '',
						addr_region: -1,
						addr_district: -1,
						addr_city: '',
						addr_street: '',
						addr_house: '',
						addr_build: '',
						addr_flat: '',
						education_id: -1,
						phone_home: '',
						phone_cell: '',
						phone_work: '',
						work_place: '',
						post_name: '',
						inn: '',
						staff_id: -1,
						learning_program_id: lProgramsCombo.getValue(),
						learning_group_id: -1,
						price: -1,
						school_unit_id: -1,
						number_in_group: 0,
						card_number: '',
						category: '',
						date_start: '',
						date_end: '',
						group_reg: -1,
						status_id: -1,
						expulsion_order_number: '',
						expulsion_date: '',
						expulsion_reason_id: -1,
						gearbox: -1,
						comment: '',
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
                studentsListPanel
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
