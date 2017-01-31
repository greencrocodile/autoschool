function editSchoolTest(id, only_result, callback) {
//*********variables**********
	var notAllowedResultId = -1;
	var testTypeId = -1;
//**********stores**********

	testsStore = Ext.create('Ext.data.Store', {
		model: 'StudentTestsModel',
		remoteSort: true,
		proxy: {
			type: 'jsonp',
			url: 'AS_tests_list.php',
			simpleSortMode: true,
			reader: {
				root: 'list'
			}
		},
		sorters: [{
			property: 'id',
			direction: 'ASC'
		}]
	});
	testsStore.getProxy().extraParams = {id: id};
		
	testsStore.load({
		callback: function (records, operation, success) {
			var test = testsStore.getById(id);
			if (test){
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
						
						var variable = variablesStore.getById('exam_not_allowed');
						notAllowedResultId = variable.data.value;
								
						var variable = variablesStore.getById('school_test_type_id');
						testTypeId = variable.data.value;
						
						var studentsStore = Ext.create('Ext.data.Store', {
							model: 'StudentsOperationsModel',
							remoteSort: true,
							proxy: {
								type: 'jsonp',
								url: 'AS_students_operations_list.php',
								simpleSortMode: true,
								reader: {
									root: 'list'
								}
							},
							sorters: [{
								property: 'full_name',
								direction: 'ASC'
							}]
						});
						
						studentsStore.getProxy().extraParams = {id: test.data.student_operation_id};
						studentsStore.load({
							callback: function (records, operation, success) {
								var student = studentsStore.getById(test.data.student_operation_id);
								
								var examTypesStore = Ext.create('Ext.data.Store', {
									model: 'ExamTypesModel',
									remoteSort: true,
									proxy: {
										type: 'jsonp',
										url: 'AS_exam_types_list.php',
										simpleSortMode: true,
										reader: {
											root: 'list'
										}
									},
									sorters: [{
										property: 'name',
										direction: 'ASC'
									}],
									listeners: {
										load: function(){
											typesCombo.setValue(test.data.type_id);
										}
									}
								});
								
								examTypesStore.getProxy().extraParams = {parent_id: testTypeId, start_id: 0};
								examTypesStore.load();
						
								var theoryResultsStore = Ext.create('Ext.data.Store', {
									model: 'TheoryResultsModel',
									remoteSort: true,
									proxy: {
										type: 'jsonp',
										url: 'AS_exam_results_list.php',
										simpleSortMode: true,
										reader: {
											root: 'list',
											totalProperty: 'total'
										}
									},
									sorters: [{
										property: 'id',
										direction: 'ASC'
									}],
									listeners:{
										load: function(){
											resultsCombo.setValue(test.data.result_id);
										}
									}
								});
								theoryResultsStore.getProxy().extraParams = {start_id : -1};
								theoryResultsStore.load();
								
								
								var motivesStore = Ext.create('Ext.data.Store', {
									model: 'ExamMotivesModel',
									remoteSort: true,
									proxy: {
										type: 'jsonp',
										url: 'AS_exam_motives_list.php',
										extraParams: {start_id: -1},
										simpleSortMode: true,
										reader: {
											root: 'list',
											totalProperty: 'total'
										}
									},
									sorters: [{
										property: 'name',
										direction: 'ASC'
									}],
									listeners:{
										load: function(){
											motiveCombo.setValue(test.data.motive_id);
										}
									}
								});
								motivesStore.getProxy().extraParams = {start_id: -1};
								motivesStore.load();
								
								var examDateField = Ext.create('Ext.form.field.Date',{
									region: 'north',
									fieldLabel: 'дата зачёта',
									labelWidth: 150,
									anchor: '100%',
									format: 'd.m.Y',
									margin: '3 3 3 3',
									value: test.data.exam_date,
									disabled: (only_result == 1)
								});

								var typesCombo = Ext.create('Ext.form.ComboBox', {
									fieldLabel: 'вид зачёта',
									region:'north',
									store: examTypesStore,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'id',
									margin: '3 3 3 3',
									labelAlign: 'left',
									labelWidth: 150,
									anchor: '100%',
									disabled: (only_result == 1),
									editable: false
								});
								
								var resultsCombo = Ext.create('Ext.form.ComboBox', {
									fieldLabel: 'оценка',
									region:'north',
									store: theoryResultsStore,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'id',
									margin: '3 3 3 3',
									labelAlign: 'left',
									labelWidth: 150,
									anchor: '100%',
									editable: false,
									listeners: {
										select: function (combo, records, eOpts) {
											if (resultsCombo.getValue() == notAllowedResultId){
												motiveCombo.setValue(test.data.motive_id);
												motiveCombo.show();
											} else {
												motiveCombo.setValue(-1);
												motiveCombo.hide();
											}
										}
									}
								});
								
								
								var motiveCombo = Ext.create('Ext.form.ComboBox', {
									fieldLabel: 'причина недопуска',
									region:'north',
									store: motivesStore,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'id',
									margin: '3 3 3 3',
									labelAlign: 'left',
									labelWidth: 150,
									anchor: '100%',
									editable: false,
									hidden: (test.data.result_id != notAllowedResultId)
								});
								
								//**********panels**********

								var fieldsPanel = Ext.create('Ext.panel.Panel', {
									border: false,
									region: 'north',
									layout: 'border',
									bodyCls: 'alt-background',
									items: [
										{
											xtype: 'label',
											region: 'north',
											margin: '3 3 3 3',
											html: 'Студент: '+student.data.full_name_with_group
										},
										examDateField,
										typesCombo,
										resultsCombo,
										motiveCombo
									]
								});

								

								function save() {

									function fail(result, request) {
										Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
									}

									function done(result, request) {
										if (result.responseText.substr(0, 2) == 'ok') {
											if (callback) {
												callback()
											}
											win.close();
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
											id: id,
											student_operation_id: test.data.student_operation_id,
											exam_type_id: typesCombo.getValue(),
											exam_result_id: resultsCombo.getValue(),
											exam_motive_id: motiveCombo.getValue(),
											exam_date: examDateField.getValue(),
											user_id: sessvars.userId
										}
									});
								}

								var win = new Ext.Window({
									title: '',
									layout: 'fit',
									resizable: true,
									modal: true,
									autoScroll: true,
									height: 200,
									width: 500,
									items: [fieldsPanel],
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
													if (resultsCombo.getValue() == -1)  {
														if(id != -1){
															Ext.MessageBox.confirm('Подтверждение', 'Оценка не проставлена.</br>Вы действительно хотите удалить результат экзамена?', function (btn) {
																if (btn == 'yes') {
																	function fail(result, request) {
																		Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
																	}
																	function done(result, request) {
																		if (result.responseText == 'ok') {
																			win.close();
																			if (callback) {
																				callback()
																			}
																		} else {
																			Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
																		}

																	}
																	
																	Ext.Ajax.request({
																		url: 'AS_exam_delete.php',
																		success: done,
																		failure: fail,
																		params: {
																			id: id,
																			user_id: sessvars.userId
																		}
																	});
																}
															});
														} else {
															Ext.Msg.alert('Ошибка', 'не проставлена оценка');
															return;
														}
													} else {
														
														if	((resultsCombo.getValue() == notAllowedResultId) && (motiveCombo.getValue() == -1)){
															Ext.Msg.alert('Ошибка', 'не выбрана причина недопуска');
															return;
														}
														save();
													}
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
													win.close();
												}
											}
										}

									]
								}).show();
							}
						});

					}
				});
			}
		}
	});
}
