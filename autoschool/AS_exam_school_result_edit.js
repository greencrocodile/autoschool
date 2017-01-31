function editSchoolTheoryExam(id, student_operation_id, exam_group_operation_id, result_id, motive_id, callback) {
//*********variables**********
	var examTypeId = -1;
//**********stores**********

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
			var variable = variablesStore.getById('school_theory_exam');
			examTypeId = variable.data.value;
					
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
				}]
			});
			
			examTypesStore.getProxy().extraParams = {start_id: 0};
			examTypesStore.load({
				callback: function (records, operation, success) {
					var eType = examTypesStore.getById(examTypeId);
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
					
					studentsStore.getProxy().extraParams = {id: student_operation_id};
					studentsStore.load({
						callback: function (records, operation, success) {
							var student = studentsStore.getById(student_operation_id);
							
							var theoryResultsStore = Ext.create('Ext.data.Store', {
								model: 'TheoryResultsModel',
								data: [
									{id: -1, name: '-----'},
									{id: 1, name: '1'},
									{id: 2, name: '2'},
									{id: 3, name: '3'},
									{id: 4, name: '4'},
									{id: 5, name: '5'},
								]
							});
							
							
							
							

							var resultsCombo = Ext.create('Ext.form.ComboBox', {
								fieldLabel: 'оценка',
								region:'north',
								store: theoryResultsStore,
								queryMode: 'local',
								displayField: 'name',
								valueField: 'id',
								margin: '5 5 5 5',
								labelAlign: 'left',
								labelWidth: 150,
								anchor: '100%',
								editable: false
							});
							resultsCombo.setValue(result_id);
							
							
							
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
										margin: '5 5 5 5',
										html: eType.data.name
									},
									{
										xtype: 'label',
										region: 'north',
										margin: '5 5 5 5',
										html: 'Студент: '+student.data.full_name_with_group
									},
									resultsCombo
									
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
										student_operation_id: student_operation_id,
										exam_group_operation_id: exam_group_operation_id,
										exam_type_id: examTypeId,
										exam_ball: resultsCombo.getValue(),
										exam_motive_id: -1,
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
														Ext.MessageBox.confirm('Подтверждение', 'Оценка не проставлена.</br>Вы действительно хотите удалить результат экзамена?</br><b><u>Результаты всех экзаменов, сданных позднее, будут удалены!</u></b>', function (btn) {
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
													if(resultsCombo.getValue()<3){
														Ext.MessageBox.confirm('Подтверждение', 'Экзамен не сдан.</br><b><u>Результаты всех экзаменов, сданных позднее, будут удалены!</u></b>', function (btn) {
															if (btn == 'yes') {
																save();
															}
														})
													} else {
														save();
													}
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
	});
}

function editSchoolCityExam(id, student_operation_id, exam_group_operation_id, result_id, motive_id, callback) {
//*********variables**********
	var examTypeId = -1;
//**********stores**********

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
			var variable = variablesStore.getById('school_city_exam');
			examTypeId = variable.data.value;
					
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
				}]
			});
			
			examTypesStore.getProxy().extraParams = {start_id: 0};
			examTypesStore.load({
				callback: function (records, operation, success) {
					var eType = examTypesStore.getById(examTypeId);
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
					
					studentsStore.getProxy().extraParams = {id: student_operation_id};
					studentsStore.load({
						callback: function (records, operation, success) {
							var student = studentsStore.getById(student_operation_id);
							
							var cityResultsStore = Ext.create('Ext.data.Store', {
								model: 'CityResultsModel',
								data: [
									{id: -1, name: '-----'},
									{id: 1, name: '1'},
									{id: 2, name: '2'},
									{id: 3, name: '3'},
									{id: 4, name: '4'},
									{id: 5, name: '5'},
								]
							});
							
							
							
							var resultsCombo = Ext.create('Ext.form.ComboBox', {
								fieldLabel: 'оценка',
								region:'north',
								store: cityResultsStore,
								queryMode: 'local',
								displayField: 'name',
								valueField: 'id',
								margin: '5 5 5 5',
								labelAlign: 'left',
								labelWidth: 150,
								anchor: '100%',
								editable: false
							});
							resultsCombo.setValue(result_id);
							
						
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
										margin: '5 5 5 5',
										html: eType.data.name
									},
									{
										xtype: 'label',
										region: 'north',
										margin: '5 5 5 5',
										html: 'Студент: '+student.data.full_name_with_group
									},
									resultsCombo
								
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
										student_operation_id: student_operation_id,
										exam_group_operation_id: exam_group_operation_id,
										exam_type_id: examTypeId,
										exam_ball: resultsCombo.getValue(),
										exam_motive_id: -1,
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
														Ext.MessageBox.confirm('Подтверждение', 'Оценка не проставлена.</br>Вы действительно хотите удалить результат экзамена?</br><b><u>Результаты всех экзаменов, сданных позднее, будут удалены!</u></b>', function (btn) {
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
													if(resultsCombo.getValue()<3){
														Ext.MessageBox.confirm('Подтверждение', 'Экзамен не сдан.</br><b><u>Результаты всех экзаменов, сданных позднее, будут удалены!</u></b>', function (btn) {
															if (btn == 'yes') {
																save();
															}
														})
													} else {
														save();
													}
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
	});
}