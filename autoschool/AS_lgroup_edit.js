function editLGroup(id, is_new, callback) {
    //**********variables**********
    var selectedStaffDisciplineId = -1;
	var selectedStaffVehicleId = -1;
    var selectedStudentId = -1;
	var selectedLGroupConfirmed = -1;
    //**********stores**********
    var lGroupsStore = Ext.create('Ext.data.Store', {
        model: 'LGroupsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_lgroups_list.php',
            extraParams: {id: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });
    lGroupsStore.getProxy().extraParams = {id: id};
    lGroupsStore.load({
        callback: function (records, operation, success) {
            var group = lGroupsStore.getById(id);
            if (group) {
				var schoolUnitsStore = Ext.create('Ext.data.Store', {
					model: 'SchoolUnitsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_school_units_list.php',
						extraParams: {start_id: -1, active_only: 1, whole_as: 0},
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
							schoolUnitsCombo.setValue(group.data.school_unit_id);
						}
					}
				});
				schoolUnitsStore.getProxy().extraParams = {start_id: -1, active_only: 1, whole_as: 0};
				schoolUnitsStore.load();

				var lProgramsStore = Ext.create('Ext.data.Store', {
					model: 'LProgramsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_lprograms_list.php',
						extraParams: {start_id: -1, active_only: 1, learning_program_type: 0},
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
							lProgramsCombo.setValue(group.data.learning_program_id);
						}
					}
				});
				if(is_new == 1){
					lProgramsStore.getProxy().extraParams = {start_id: -1, active_only: 1, learning_program_type: 0};
				} else {
					lProgramsStore.getProxy().extraParams = {start_id: -1, active_only: 0, learning_program_type: 0};
				}
				
				lProgramsStore.load();

				var lProgramPricesStore = Ext.create('Ext.data.Store', {
					model: 'LProgramPriceHistoryModel',
					remoteSort: true,
					pageSize: 1000000000,
					proxy: {
						type: 'jsonp',
						url: 'AS_lprogram_price_history_list.php',
						extraParams: {learning_program_id: 0,start_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					sorters: [{
						property: 'date_begin',
						direction: 'DESC'
					}],
					listeners:{
						load: function(){
							lProgramPricesCombo.setValue(group.data.price_id);
						}
					}
				});
				lProgramPricesStore.getProxy().extraParams = {learning_program_id: group.data.learning_program_id,start_id: -1};
				lProgramPricesStore.load();


				var staffDisciplinesStore = Ext.create('Ext.data.Store', {
					model: 'GroupStaffDisciplinesModel',
					remoteSort: true,
					proxy: {
						type: 'jsonp',
						url: 'AS_group_staff_disciplines_list.php',
						extraParams: {group_id: -1, id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					pageSize: 10,
					sorters: [{
							property: 'learning_discipline_name',
							direction: 'ASC'
						}]
				});
				
				staffDisciplinesStore.getProxy().extraParams = {group_id: group.data.id};
				staffDisciplinesStore.load();


				var staffVehiclesStore = Ext.create('Ext.data.Store', {
					model: 'GroupStaffVehiclesModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_group_staff_vehicles_list.php',
						extraParams: {group_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 10,
					sorters: [{
						property: 'staff_name',
						direction: 'ASC'
					}]
				});
				
				staffVehiclesStore.getProxy().extraParams = {group_id: group.data.id};
				staffVehiclesStore.load();

				var respStaffStore = Ext.create('Ext.data.Store', {
					model: 'StaffModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_staff_list.php',
						extraParams: {start_id: -1, active_only: 1, id: -1},
						reader: {
							root: 'list',
							totalProperty: 'total'
						},
						simpleSortMode: true
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'initials_name',
						direction: 'ASC'
					}],
					listeners: {
						load: function(){
							respStaffCombo.setValue(group.data.gibdd_reg_staff_id);
						}
					}
				});
				respStaffStore.getProxy().extraParams = {start_id: -1, active_only: 1, id: -1};
				respStaffStore.load();

				var studentsStore = Ext.create('Ext.data.Store', {
					model: 'StudentsOperationsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_students_operations_list.php',
						extraParams: {learning_group_id: -1, active_only: 1, sort_by_numbers: 1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 30,
					sorters: [{
						property: 'full_name',
						direction: 'ASC'
					}]
				});
				
				studentsStore.getProxy().extraParams = {learning_group_id: group.data.id, active_only: 1, sort_by_numbers: 1};
				studentsStore.load();

                //**********fields**********
				var schoolUnitsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'место занятий',
					store: schoolUnitsStore,
					queryMode: 'local',
					displayField: 'name_full',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					editable: false
				});

				var lProgramsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Программа',
					store: lProgramsStore,
					queryMode: 'local',
					displayField: 'name_full',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					editable: false,
					listeners: {
						select: function (combo, records, eOpts) {
							lProgramPricesCombo.setValue(-1);
							lProgramPricesStore.getProxy().extraParams = {learning_program_id: lProgramsCombo.getValue(),start_id: -1};
							lProgramPricesStore.load({
								callback: function(records, operation, success){
									lProgramPricesCombo.setValue(-1);
								}
							});
						}
					}
				});

				var lProgramPricesCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Стоимость',
					store: lProgramPricesStore,
					queryMode: 'local',
					displayField: 'price',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					editable: false
				});

				var respStaffCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Ответственный',
					store: respStaffStore,
					queryMode: 'local',
					displayField: 'initials_name',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					editable: false
				});
				
				var numberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Номер группы',
					margin: '3 3 3 3',
					value: group.data.number
				});

				var dateStartField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'начало',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.date_start
				});

				var dateEndField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'окончание',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.date_end
				});

				var regOrderNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'номер',
					margin: '3 3 3 3',
					value: group.data.reg_order_number
				});

				var regOrderDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'дата',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.reg_order_date
				});

				var gibddRegNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'исходящий №',
					margin: '3 3 3 3',
					value: group.data.gibdd_reg_number
				});

				var gibddRegDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'дата',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.gibdd_reg_date
				});

				var theoryExamDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'теория в АШ',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.theory_exam_date
				});

				var practiceExamDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'практика в АШ',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.practice_exam_date
				});

				var gibddExamDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'экзамен в ГИБДД',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.gibdd_exam_date
				});

                
                //**********grids**********

				var staffDisciplinesGrid = Ext.create('Ext.grid.Panel', {
					store: staffDisciplinesStore,
					region: 'center',
					margin: '10 0 10 0',
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					columns: [{
							dataIndex: 'learning_discipline_name',
							text: 'дисциплина',
							flex: 2,
							sortable: true
						}, {
							dataIndex: 'staff_name',
							text: 'преподаватель',
							flex: 2,
							sortable: true
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: staffDisciplinesStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					}),
					listeners: {
						itemclick: function (view, record) {
							if (record) {
								selectedStaffDisciplineId = record.data.id;
							}
						},
						itemdblclick: function (view, record) {
							if (record) {
								selectedStaffDisciplineId = record.data.id;
								editGroupStaffDiscipline(selectedStaffDisciplineId,0,function(){
									staffDisciplinesStore.reload();
								})
							}
						}
					}
				});

				var staffVehiclesGrid = Ext.create('Ext.grid.Panel', {
					store: staffVehiclesStore,
					margin: '10 0 10 0',
					disableSelection: false,
					region: 'center',
					rowLines: true,
					columnLines: true,
					columns: [{
							dataIndex: 'vehicle_name',
							text: 'транспортное средство',
							flex: 2,
							sortable: true
						}, {
							dataIndex: 'staff_name',
							text: 'преподаватель',
							flex: 2,
							sortable: true
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: staffVehiclesStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					}),
					listeners: {
						itemclick: function (view, record) {
							if (record) {
								selectedStaffVehicleId = record.data.id;
							}
						},
						itemdblclick: function (view, record) {
							if (record) {
								selectedStaffVehicleId = record.data.id;
								editGroupStaffVehicle(selectedStaffVehicleId,0,function(){
									staffVehiclesStore.reload();
								})
							}
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
							dataIndex: 'number_in_group',
							text: '№ п/п',
							width:40,
							sortable: false
						}, {
							dataIndex: 'lastname',
							text: 'фамилия',
							width: 100,
							sortable: false
						}, {
							dataIndex: 'firstname',
							text: 'имя',
							width: 100,
							sortable: false
						}, {
							dataIndex: 'middlename',
							text: 'отчество',
							width: 100,
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
							width: 100,
							sortable: false
						}, {
							dataIndex: 'card_number',
							text: '№ карточки',
							width: 50,
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
								selectedStudentId = record.data.id;
								// studentNameLabel.setText('<span style="font-size: 180%; color: red">&nbsp;[' + record.data.initials_name + ']&nbsp;</span>', false);
							}
						},
						itemdblclick: function (view, record) {
							if (record) {
								if (checkUserRole('FL_CARD_R')) {
									selectedStudentId = record.data.id;
									// studentNameLabel.setText('<span style="font-size: 180%; color: red">&nbsp;[' + record.data.initials_name + ']&nbsp;</span>', false);
									editStudent(selectedStudentId,0,function(){
										studentsStore.reload();
									})
								}
							}
						}
					}
				});
				//**********buttons**********
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
							deleteStudent(selectedStudentId,function(){
								studentsStore.reload();
							})
						}
					}
				});
				var bLGroupConfirm = Ext.create('Ext.Button', {
					text: '',
					margin: '3 3 3 3',
					disabled: !checkUserRole('LG_E'),
					listeners: {
						click: function () {
							if(selectedLGroupConfirmed == 0){
								Ext.MessageBox.confirm('Confirm', 'Утвердить группу?', function (btn) {
									function done(result,request){
										studentsStore.reload({
											callback: function (records, operation, success) {
												selectedLGroupConfirmed = 1;
												bAddStudent.disable();
												bDeleteSudent.disable();
												bLGroupConfirm.setText('Отменить утверждение группы');
											}
										})
									}
									function fail(result, request) {
										Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
									};
									if (btn == 'yes') {
										Ext.Ajax.request({
											url: 'AS_lgroup_confirm.php',
											success: done,
											failure: fail,
											params: {
												id: group.data.id,
												user_id: sessvars.userId
											}
										});
									}
								})
							} else {
								Ext.MessageBox.confirm('Confirm', 'Отменить утверждение группы?', function (btn) {
									function done(result,request){
										studentsStore.reload({
											callback: function (records, operation, success) {
												selectedLGroupConfirmed = 0;
												bAddStudent.enable();
												bDeleteSudent.enable();
												bLGroupConfirm.setText('Утвердить группу');
											}
										})
									}
									function fail(result, request) {
										Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
									};
									if (btn == 'yes') {
										Ext.Ajax.request({
											url: 'AS_lgroup_unconfirm.php',
											success: done,
											failure: fail,
											params: {
												id: group.data.id,
												user_id: sessvars.userId
											}
										});
									}
								})
							}
						}
					}
				});
				
				if (group.data.confirmed == 1){
					bLGroupConfirm.setText('Отменить утверждение группы');
					bAddStudent.disable();
					bDeleteSudent.disable();
				} else {
					bLGroupConfirm.setText('Утвердить группу');
					bAddStudent.enable();
					bDeleteSudent.enable();
				}
				
				selectedLGroupConfirmed = group.data.confirmed;
                //**********panels**********

                var editStaffDisciplinesPanel = Ext.create('Ext.panel.Panel', {
					bodyCls: 'alt-background',
					region: 'north',
					border: false,
					items: [
						{
							xtype: 'button',
							text: 'Добавить',
							margin: '0 5 0 0',
							listeners: {
								click: function () {
									addGroupStaffDiscipline(function(id){
										editGroupStaffDiscipline(id,1,function(){
											staffDisciplinesStore.reload();
										})
									});
								}
							}
						},
						{
							xtype: 'button',
							text: 'Добавить дисциплины из программы',
							margin: '0 5 0 0',
							listeners: {
								click: function () {
									loadDisciplineFromProgram(group.data.id, lProgramsCombo.getValue(),
										function () {
											staffDisciplinesStore.reload();
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
									deleteGroupStaffDiscipline(selectedStaffDisciplineId,function(){
										staffDisciplinesStore.reload();
									})
								}
							}

						}
					]
				});
				
				var editStaffVehiclesPanel = Ext.create('Ext.panel.Panel', {
					bodyCls: 'alt-background',
					region: 'north',
					border: false,
					items: [
						{
							xtype: 'button',
							text: 'Добавить',
							margin: '0 5 0 0',
							listeners: {
								click: function () {
									addGroupStaffVehicle(function(id){
										editGroupStaffVehicle(id,1,function(){
											staffVehiclesStore.reload();
										})
									});
								}
							}
						},
						{
							xtype: 'button',
							text: 'Удалить',
							listeners: {
								click: function () {
									deleteGroupStaffVehicle(selectedStaffVehicleId,function(){
										staffVehiclesStore.reload();
									})
								}
							}
						}
					]
				});
				
				
				var editStudentsPanel = Ext.create('Ext.panel.Panel', {
					border: false,
					region: 'north',
					bodyCls: 'alt-background',
					items: [
						bAddStudent,
						bDeleteSudent,
						bLGroupConfirm,
						{
							xtype: 'button',
							// text: 'Документы',
							iconCls: 'doc-img',
							margin: '3 3 3 3',
							listeners: {
								click: function () {
									if (selectedStudentId != -1){
										exportDocuments(-1,selectedStudentId,-1,null,-1,-1,-1,-1,-1,'learning_group_students_documents', function () {})
									}
								}
							}
						}
					]
				});
				
				// var studentNameLabel = Ext.create('Ext.form.Label', {
					// frame: true,
					// margin: '10 10 10 10'
				// });
				
				// var panelS = Ext.create('Ext.panel.Panel', {
					// region: 'north',
					// border: false,
					// bodyCls: 'alt-background',
					// items: [
						// studentNameLabel
					// ]
				// });

				var studentsTab = Ext.create('Ext.panel.Panel', {
					id: 'studentsTab',
					bodyCls: 'alt-background',
					title: 'список студентов',
					border: false,
					layout: 'border',
					items: [
						// panelS,
						editStudentsPanel,
						studentsGrid
					]
				});
		
				var groupTab = Ext.create('Ext.panel.Panel', {
					title: 'группа',
					bodyCls: 'alt-background',
					id: 'groupTab',
					layout: 'border',
					border: false,
					items: [
						Ext.create('Ext.form.Panel', {
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 5,
							region: 'west',
							width: 500,
							fieldDefaults: {
								labelAlign: 'left',
								labelWidth: 100
							},
							items: [
								numberField,
								{
									xtype: 'fieldset',
									title: 'Обучение',
									items: [
										lProgramsCombo,
										lProgramPricesCombo,
										schoolUnitsCombo,
										dateStartField,
										dateEndField
									]
								},
								{
									xtype: 'fieldset',
									title: 'приказ АШ о регистрации',
									width: 290,
									fieldDefaults: {
										anchor: '100%'
									},
									items: [
										regOrderNumberField,
										regOrderDateField
									]
								},
								{
									xtype: 'fieldset',
									title: 'регистрация в ГИБДД',
									items: [
										respStaffCombo,
										gibddRegNumberField,
										gibddRegDateField
									]
								},
								{
									xtype: 'fieldset',
									title: 'Даты экзаменов',
									width: 290,
									fieldDefaults: {
										anchor: '100%'
									},
									items: [
										theoryExamDateField,
										practiceExamDateField,
										gibddExamDateField
									]
								}
							]
						}),
						Ext.create('Ext.form.Panel', {
							region: 'center',
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 5,
							items: [
								{
									xtype: 'fieldset',
									layout: 'border',
									region: 'north',
									height: 240,
									title: 'Преподаватели',
									items: [
										editStaffDisciplinesPanel,
										staffDisciplinesGrid
									]
								},
								{
									xtype: 'fieldset',
									layout: 'border',
									region: 'north',
									height: 240,
									title: 'Инструкторы',
									items: [
										editStaffVehiclesPanel,
										staffVehiclesGrid
									]
								}
							]
						})
					]
				});

				var groupTabPanel = Ext.create('Ext.tab.Panel', {
					id: 'groupTabPanel',
					region: 'center',
					layout: 'border',
					border: false,
					items: [
						groupTab,
						studentsTab
					]
				})

                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 5,
                    bodyCls: 'alt-background',
                    items: [
                        groupTabPanel
                    ]
                });

                function addGroupStaffDiscipline(callback) {
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
                            url: 'AS_group_staff_discipline_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
								group_id: group.data.id,
                                staff_id: -1,
                                discipline_id: -1,
                                user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }
				
				function addGroupStaffVehicle(callback) {
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
                            url: 'AS_group_staff_vehicle_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
								group_id: group.data.id,
                                staff_id: -1,
                                vehicle_id: -1,
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
                            url: 'AS_lgroup_delete.php',
                            success: done,
                            params: {
                                id: id,
                                hard_delete: 1,
                                user_id: sessvars.userId
                            }
                        });
                    }
                }
				
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
								learning_program_id: group.data.learning_program_id,
								learning_group_id: group.data.id,
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
                        url: 'AS_lgroup_edit.php',
                        success: done,
                        failure: fail,
                        params: {
							id: id,
							learning_program_id: lProgramsCombo.getValue(),
							school_unit_id: schoolUnitsCombo.getValue(),
							gibdd_reg_staff_id: respStaffCombo.getValue(),
							number: numberField.getValue(),
							date_start: dateStartField.getValue(),
							date_end: dateEndField.getValue(),
							reg_order_number: regOrderNumberField.getValue(),
							reg_order_date: regOrderDateField.getValue(),
							gibdd_reg_order_number: gibddRegNumberField.getValue(),
							gibdd_reg_order_date: gibddRegDateField.getValue(),
							theory_exam_date: theoryExamDateField.getValue(),
							practice_exam_date: practiceExamDateField.getValue(),
							gibdd_exam_date: gibddExamDateField.getValue(),
							price: lProgramPricesCombo.getValue(),
							user_id: sessvars.userId
                        }
                    });
                }
				
				function loadDisciplineFromProgram(group_id, learning_program_id, callback) {	
					var lProgramsStore = Ext.create('Ext.data.Store', {
						model: 'LProgramsModel',
						proxy: {
							type: 'jsonp',
							url: 'AS_lprograms_list.php',
							extraParams: {start_id: -1, active_only: 1, learning_program_type: 0},
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
						}]
					});

					lProgramsStore.getProxy().extraParams = {id: learning_program_id};
					lProgramsStore.load({
						callback: function (records, operation, success) {
            
							var program = lProgramsStore.getById(learning_program_id);
							if (program){
								function fail(result, request) {
									Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
								}

								function done(result, request) {
									if (result.responseText == 'ok') {
										if (callback) {
											callback()
										}

									} else {
										Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
									}

								}
								
								Ext.MessageBox.confirm('Подтверждение', 'Добавить список дисциплин из программы "' + program.data.name_full + '"?', function (btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
											url: 'AS_lgroup_load_disc_from_program.php',
											success: done,
											failure: fail,
											params: {
												group_id: group_id,
												learning_program_id: learning_program_id,
												user_id: sessvars.userId
											}
										});
									} else {
										if (callback) {
											callback();
										}
									}
								});
							}
						}
					})
				}

                var win = new Ext.Window({
                    title: (id == -1) ? 'Новая группа' : 'Редактирование группы',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    height: 600,
                    width: 1000,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
							disabled: !checkUserRole('LG_E'),
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