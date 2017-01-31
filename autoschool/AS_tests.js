Ext.Loader.setPath('Ext.ux', 'ux');
Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.data.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.toolbar.*',
]);

Ext.onReady(function () {
	initDataModels();
	
	var notAllowedResultId = -1;
	var disciplineId = -1;
	var examTypeId = -1;

    var panelN = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        bodyCls: 'alt-background',
        items: [menuPanel]
    });

    if (checkUserRole('TESTS_R')) {
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
				var variable = variablesStore.getById('school_test_type_id');
				examTypeId = variable.data.value;
				
				variable = variablesStore.getById('drive_lesson_discipline_id');
				disciplineId = variable.data.value;
				
				variable = variablesStore.getById('exam_not_allowed');
				notAllowedResultId = variable.data.value;

        //**********stores**********
				var staffStore = Ext.create('Ext.data.Store', {
					model: 'StaffModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_staff_list.php',
						extraParams: {start_id: -1, active_only: 1, discipline_id: disciplineId},
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

				staffStore.load();

				var testTypesStore = Ext.create('Ext.data.Store', {
					model: 'ExamTypesModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_exam_types_list.php',
						extraParams: {start_id: -1, parent_id: examTypeId},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					listeners: {
						'load': function () {
							testTypesCombo.setValue(-1);
						}
					}
				});

				testTypesStore.load();		
				
				var testsStore = Ext.create('Ext.data.Store', {
					model: 'StudentTestsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_tests_list.php',
						extraParams: {student_operation_id: -1, test_date: '', test_type_id: -1,staff_id: -1,group_number: ''},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					sorters: [{
						property: 'full_name_with_group',
						direction: 'ASC'
					}],
					remoteSort: true,
					pageSize: 1000000000
				});
				
				var resultsStore = Ext.create('Ext.data.Store', {
					model: 'TheoryResultsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_exam_results_list.php',
						simpleSortMode: true,
						extraParams: {start_id : -1},
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					listeners: {
						'load': function () {
							resultsCombo.setValue(-1);
						}
					}
				});
				resultsStore.load();
				
				var motiveStore = Ext.create('Ext.data.Store', {
					model: 'ExamMotivesModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_exam_motives_list.php',
						simpleSortMode: true,
						extraParams: {start_id : -1},
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					listeners: {
						'load': function () {
							motiveCombo.setValue(-1);
						}
					}
				});
				motiveStore.load();
				
				var studentsStore = Ext.create('Ext.data.Store', {
					model: 'StudentOperationsStaffModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_student_operations_staff_list.php',
						extraParams: {staff_id: -1,learning_group_number: ''},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					sorters: [{
						property: 'full_name_with_group',
						direction: 'ASC'
					}],
					pageSize: 1000000000,
					listeners: {
						'load': function () {
							studentsCombo.setValue(-1);
						}
					}
				});

				//**********combos**********

				var testTypesCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Вид зачёта',
					region: 'north',
					store: testTypesStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					labelWidth: 100,
					width: 500,
					editable: true,
					allowBlank: true
				});
				
				var staffCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Инструктор',
					region: 'north',
					store: staffStore,
					queryMode: 'local',
					displayField: 'initials_name',
					valueField: 'id',
					margin: '3 3 3 3',
					labelWidth: 100,
					width: 500,
					editable: true,
					allowBlank: true
				});
				
				var studentsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Студент',
					region: 'north',
					store: studentsStore,
					queryMode: 'local',
					displayField: 'full_name_with_group',
					valueField: 'id',
					margin: '3 3 3 3',
					labelWidth: 100,
					width: 500,
					editable: true,
					allowBlank: true,
					hidden: true,
					listeners: {
						select: function (combo, records, eOpts) {
							if (studentsCombo.getValue() == -1){
								resultsCombo.hide();
								motiveCombo.hide();
							} else {
								checkStudentSuccessfullTest(studentsCombo.getValue(),testTypesCombo.getValue(),function(exist){
									if (exist == 1){
										Ext.MessageBox.confirm('Подтверждение', 'Этот студент уже сдал зачёт ранее. Продолжить?', function (btn) {
											if (btn == 'yes') {
												resultsCombo.show();
												resultsCombo.setValue(-1);
												motiveCombo.setValue(-1);
												motiveCombo.hide();
												bAddResult.hide();
											}
										});
									} else {
										editGibddTheoryExam(record.data.theory_exam_id, record.data.student_operation_id, record.data.id, record.data.theory_result_id,record.data.theory_motive_id, function(){
											studentsStore.reload();
										});
									}
								});
								
							}
						}
					}
				});
				
				var resultsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Оценка',
					region: 'north',
					store: resultsStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					labelWidth: 100,
					width: 500,
					editable: false,
					allowBlank: true,
					hidden: true,
					listeners: {
						select: function (combo, records, eOpts) {
							if (resultsCombo.getValue() == -1){
								motiveCombo.hide();
								bAddResult.hide();
							} else {
								if (resultsCombo.getValue() == notAllowedResultId){
									motiveCombo.setValue(-1);
									motiveCombo.show();
									bAddResult.hide();
								} else {
									motiveCombo.setValue(-1);
									motiveCombo.hide();
									bAddResult.show();
								}
							}
						}
					}
				});
				
				var motiveCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Причина недопуска',
					region: 'north',
					store: motiveStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					labelWidth: 100,
					width: 500,
					editable: false,
					allowBlank: true,
					hidden: true,
					listeners: {
						select: function (combo, records, eOpts) {
							if (resultsCombo.getValue() == -1){
								bAddResult.hide();
							} else {
								bAddResult.show();
							}
						}
					}
				});
				
				//**********fields**********

				var groupNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'группа',
					region: 'north',
					labelWidth: 100,
					margin: '3 3 3 3'
				});

				var testDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'дата зачёта',
					region: 'north',
					startDay: 1,
					labelWidth: 100,
					format: 'd.m.Y',
					margin: '3 3 3 3'
				});

				//**********grids**********
				var testsGrid = Ext.create('Ext.grid.Panel', {
					region:'center',
					store: testsStore,
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					columns: [
						{
							dataIndex: 'full_name_with_group',
							text: 'ФИО студента',
							width:300
						}, {
							dataIndex: 'school_unit_name_short',
							text: 'место',
							width:70
						}, {
							dataIndex: 'category',
							text: 'категория',
							width:70
						}, {
							dataIndex: 'result_name',
							text: 'оценка',
							width:70
						}, {
							dataIndex: 'motive_name',
							text: 'причина недопуска',
							width:300
						}
					],
					viewConfig : {
						listeners : {
							celldblclick : function(view, cell, cellIndex, record,row, rowIndex, e) {
								var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
								if(clickedDataIndex == 'full_name_with_group'){
									if (checkUserRole('FL_CARD_R')){
										editStudent(record.data.student_operation_id,0);
									}
								}
								if (checkUserRole('TESTS_E')){
									if(clickedDataIndex == 'result_name'){
										editSchoolTest(record.data.id,1,function(){
												testsStore.reload();											
											}
										)
									}
									
								}
							}
						}
					},
					bbar: Ext.create('Ext.PagingToolbar', {
						store: testsStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					})
				});

				//**********buttons**********

				var bApply = Ext.create('Ext.Button', {
					text: 'Применить',
					margin: '3 3 3 3',
					listeners: {
						click: function () {
							if(testDateField.getValue() == null){
								Ext.Msg.alert('Ошибка', 'не выбрана дата зачёта');
                                return;
							}
							if(testTypesCombo.getValue() == -1){
								Ext.Msg.alert('Ошибка', 'не выбран вид зачёта');
                                return;
							}
							studentsStore.getProxy().extraParams = {start_id: -1,staff_id : staffCombo.getValue(),learning_group_number: groupNumberField.getValue()};
							studentsStore.load({
								callback: function (records, operation, success) {
									studentsCombo.show();
									studentsCombo.setValue(-1);
									resultsCombo.hide();
									motiveCombo.hide();
									testsStore.getProxy().extraParams = {test_date: testDateField.getValue(), test_type_id: testTypesCombo.getValue(),staff_id: staffCombo.getValue(),group_number: groupNumberField.getValue()};
									testsStore.load();
									bAddResult.hide();
								}
							});
						}
					}
				});
				
				var bReset = Ext.create('Ext.Button', {
					text: 'Сброс',
					margin: '3 3 3 3',
					listeners: {
						click: function () {
							studentsCombo.hide();
							resultsCombo.hide();
							motiveCombo.hide();
							staffCombo.setValue(-1);
							groupNumberField.setValue('');
							testTypesCombo.setValue(-1);
							testDateField.setValue(null);
							testsStore.getProxy().extraParams = {test_type_id: -2};
							testsStore.load();
						}
					}
				});
				
				var bAddResult = Ext.create('Ext.Button', {
					text: 'поставить оценку',
					hidden: true,
					margin: '3 3 3 3',
					listeners: {
						click: function () {
							function fail(result, request) {
								Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
							}

							function done(result, request) {
								if (result.responseText.substr(0, 2) == 'ok') {
									testsStore.reload();
									studentsStore.reload();									
								} else {
									Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
									return;
								}
							}
							
							Ext.Ajax.request({
								url: 'AS_exam_edit.php',
								success: done,
								failure: fail,
								params: {
									id: -1,
									student_operation_id: studentsCombo.getValue(),
									exam_type_id: testTypesCombo.getValue(),
									exam_result_id: resultsCombo.getValue(),
									exam_motive_id: motiveCombo.getValue(),
									exam_date: testDateField.getValue(),
									user_id: sessvars.userId
								}
							});
						}
					}
				});

				//**********panels**********

				var panelP = Ext.create('Ext.panel.Panel', {
					region: 'north',
					border: false,
					bodyCls: 'alt-background',
					items: [
						{
							xtype: 'label',
							html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Зачётная ведомость&nbsp;</span>'
						}
					]
				});

				var panelFilter = Ext.create('Ext.panel.Panel', {
					region: 'north',
					border: false,
					bodyCls: 'alt-background',
					// layout: 'border',
					items: [
						testDateField,
						testTypesCombo,
						groupNumberField,
						staffCombo,
						// {
							// xtype: 'fieldcontainer',
							// region: 'north',
							// layout: 'hbox',
							// items:[
								bApply,
								bReset,
							// ]
						// },
						studentsCombo,
						resultsCombo,
						motiveCombo,
						// {
							// xtype: 'fieldcontainer',
							// layout: 'hbox',
							// region: 'north',
							// items:[
								bAddResult
							// ]
						// }
							
					]
				});

				//***********functions**********

				Ext.create('Ext.container.Viewport', {
					layout: 'border',
					items: [
						panelN,
						panelP,
						panelFilter,
						testsGrid
					]
				});
			}
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
