function editGibddExamGroup(id, is_new, callback) {
    //**********variables**********
    var selectedGibddExamGroupStudentId = -1;
    //**********stores**********
    var gibddExamGroupsStore = Ext.create('Ext.data.Store', {
        model: 'GibddExamGroupsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_exam_groups_gibdd_list.php',
            extraParams: {id: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });
    gibddExamGroupsStore.getProxy().extraParams = {id: id};
    gibddExamGroupsStore.load({
        callback: function (records, operation, success) {
            var group = gibddExamGroupsStore.getById(id);
            if (group) {
				var studentsStore = Ext.create('Ext.data.Store', {
					model: 'GibddExamGroupResultsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_exam_group_gibdd_results_list.php',
						extraParams: {exam_group_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'id',
						direction: 'ASC'
					}]
				});
				studentsStore.getProxy().extraParams = {exam_group_id: group.data.id};
				studentsStore.load();

				var staffStore = Ext.create('Ext.data.Store', {
					model: 'StaffModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_staff_list.php',
						extraParams: {start_id: -1, active_only: 0, id: -1},
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
							staffCombo.setValue(group.data.gibdd_reg_staff_id);
						}
					}
				});
				if (is_new == 1){
					staffStore.getProxy().extraParams = {start_id: -1, active_only: 1, id: -1};
				} else {
					staffStore.getProxy().extraParams = {start_id: -1, active_only: 0, id: -1};
				}
				staffStore.load();


                //**********fields**********
				var staffCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Ответственный',
					store: staffStore,
					queryMode: 'local',
					displayField: 'initials_name',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					matchFieldWidth: false,
                    listConfig: {
                        width: 200
                    },
					editable: false
				});
				
				 var numberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'номер группы',
					region: 'north',
					labelWidth: 150,
					anchor: '100%',
					allowBlank: false,
					margin: '3 3 3 3',
					value: group.data.number
				});

				var examDateField = Ext.create('Ext.form.field.Date', {
					region: 'north',
					fieldLabel: 'дата экзамена',
					labelWidth: 150,
					anchor: '100%',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.exam_date
				});

				var protocolNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'номер протокола',
					labelWidth: 150,
					anchor: '100%',
					allowBlank: false,
					margin: '3 3 3 3',
					value: group.data.protocol_number
				});

				var protocolDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'дата протокола',
					labelWidth: 150,
					anchor: '100%',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.protocol_date
				});

				var regDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'дата регистрации',
					labelWidth: 150,
					anchor: '100%',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: group.data.gibdd_reg_date
				});

                
                //**********grids**********

				var studentsGrid = Ext.create('Ext.grid.Panel', {
					store: studentsStore,
					region: 'center',
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					columns: [{
							dataIndex: 'student_number',
							text: 'номер',
							width: 100,
							sortable: true
						}, {
							dataIndex: 'school_unit_name_short',
							text: 'место',
							width: 70,
							sortable: true
						}, {
							dataIndex: 'student_full_name',
							text: 'ФИО',
							flex: 2,
							sortable: true
						}, {
							dataIndex: 'theory_result',
							text: 'теория',
							width: 70,
							sortable: true
						}, {
							dataIndex: 'polygon_result',
							text: 'площадка',
							width: 70,
							sortable: true
						}, {
							dataIndex: 'city_result',
							text: 'город',
							width: 70,
							sortable: true
						}, {
							dataIndex: 'cert_number',
							text: 'свидетельство',
							width: 70,
							sortable: true
						}
					],
					viewConfig : {
						listeners : {
							celldblclick : function(view, cell, cellIndex, record,row, rowIndex, e) {
								
								var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
								if(clickedDataIndex == 'student_full_name'){
									if (checkUserRole('FL_CARD_R')){
										editStudent(record.data.student_operation_id,0);
									}
								}
								if(checkUserRole('EGG_E')){	
									if(clickedDataIndex == 'theory_result'){
										if(record.data.theory_exam_id == -1){
											checkStudentAllowExam(record.data.student_operation_id,'gibdd_theory_exam', function(allow){
												if (allow == 1){
													checkStudentSuccessfullExam(record.data.student_operation_id,'gibdd_theory_exam',function(exist){
														if (exist == 1){
															Ext.MessageBox.confirm('Подтверждение', 'Этот студент уже сдал экзамен ранее. Продолжить?', function (btn) {
																if (btn == 'yes') {
																	editGibddTheoryExam(record.data.theory_exam_id, record.data.student_operation_id, record.data.id, record.data.theory_result_id,record.data.theory_motive_id, function(){
																		studentsStore.reload();
																	});
																}
															});
														} else {
															editGibddTheoryExam(record.data.theory_exam_id, record.data.student_operation_id, record.data.id, record.data.theory_result_id,record.data.theory_motive_id, function(){
																studentsStore.reload();
															});
														}
													})
												} else {
													Ext.Msg.alert('Внимание!', 'У студента не сдан предыдущий экзамен!');
												}
											});
											
										} else {
											editGibddTheoryExam(record.data.theory_exam_id, record.data.student_operation_id, record.data.id, record.data.theory_result_id,record.data.theory_motive_id, function(){
												studentsStore.reload();
											});
										}
									}
									if(clickedDataIndex == 'polygon_result'){
										if(record.data.polygon_exam_id == -1){
											checkStudentAllowExam(record.data.student_operation_id,'gibdd_polygon_exam', function(allow){
												if (allow == 1){
													checkStudentSuccessfullExam(record.data.student_operation_id,'gibdd_polygon_exam',function(exist){
														if (exist == 1){
															Ext.MessageBox.confirm('Подтверждение', 'Этот студент уже сдал экзамен ранее. Продолжить?', function (btn) {
																if (btn == 'yes') {
																	editGibddPolygonExam(record.data.polygon_exam_id, record.data.student_operation_id, record.data.id, record.data.polygon_result_id,record.data.polygon_motive_id, function(){
																		studentsStore.reload();
																	});
																}
															});
														} else {
															editGibddPolygonExam(record.data.polygon_exam_id, record.data.student_operation_id, record.data.id, record.data.polygon_result_id,record.data.polygon_motive_id, function(){
																studentsStore.reload();
															});
														}
													})
												} else {
													Ext.Msg.alert('Внимание!', 'У студента не сдан предыдущий экзамен!');
												}
											});
										} else {
											editGibddPolygonExam(record.data.polygon_exam_id, record.data.student_operation_id, record.data.id, record.data.polygon_result_id,record.data.polygon_motive_id, function(){
												studentsStore.reload();
											});
										}
									}
									if(clickedDataIndex == 'city_result'){
										if(record.data.city_exam_id == -1){
											checkStudentAllowExam(record.data.student_operation_id,'gibdd_city_exam', function(allow){
												if (allow == 1){
													checkStudentSuccessfullExam(record.data.student_operation_id,'gibdd_city_exam',function(exist){
														if (exist == 1){
															Ext.MessageBox.confirm('Подтверждение', 'Этот студент уже сдал экзамен ранее. Продолжить?', function (btn) {
																if (btn == 'yes') {
																	editGibddCityExam(record.data.city_exam_id, record.data.student_operation_id, record.data.id, record.data.city_result_id,record.data.city_motive_id, function(){
																		studentsStore.reload();
																	});
																}
															});
														} else {
															editGibddCityExam(record.data.city_exam_id, record.data.student_operation_id, record.data.id, record.data.city_result_id,record.data.city_motive_id, function(){
																studentsStore.reload();
															});
														}
													})
												} else {
													Ext.Msg.alert('Внимание!', 'У студента не сдан предыдущий экзамен!');
												}
											});
										} else {
											editGibddCityExam(record.data.city_exam_id, record.data.student_operation_id, record.data.id, record.data.city_result_id,record.data.city_motive_id, function(){
												studentsStore.reload();
											});
										}
									}
								}
								// console.log(clickedDataIndex);
								// console.log(view.panel.headerCt.getHeaderAtIndex(cellIndex).text);
								// console.log(record.get(clickedDataIndex));
							}
						}
					},
					bbar: Ext.create('Ext.PagingToolbar', {
						store: studentsStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					}),
					listeners: {
						itemclick: function (view, record) {
							if(record){
								selectedGibddExamGroupStudentId = record.data.id;
							}
						}
					}
				})
				//**********buttons**********
				var editStudentPanel = Ext.create('Ext.panel.Panel', {
					border: false,
					region: 'north',
					bodyCls: 'alt-background',
					items: [
						{
							xtype: 'button',
							text: 'Добавить студента',
							margin: '5 5 5 5',
							disabled: !checkUserRole('EGG_E'),
							listeners: {
								click: function () {
									addStudent(function(id){
										editGibddExamStudent(id,1,function(){
												studentsStore.reload();
											}
										)
									});
								}
							}
						},
						{
							xtype: 'button',
							text: 'Удалить студента',
							margin: '5 5 5 5',
							disabled: !checkUserRole('EGG_E'),
							listeners: {
								click: function () {
									deleteGibddExamStudent(selectedGibddExamGroupStudentId,function(){
										studentsStore.reload();
									})
								}
							}
						},
						{
							xtype: 'button',
							text: 'проставить оценки',
							margin: '5 5 5 5',
							disabled: !checkUserRole('EGG_E'),
							listeners: {
								click: function () {
									studentsGrid.body.mask('Сохранение...');
									setExamGroupDefaultResults(group.data.id,function(){
										studentsStore.reload();
										studentsGrid.body.unmask();
									})
								}
							}
						},
					]
				});
		
				var groupPanel = Ext.create('Ext.panel.Panel', {
					bodyCls: 'alt-background',
					id: 'groupPanel',
					layout: 'border',
					border: false,
					items: [
						{
							xtype: 'fieldset',
							layout: 'border',
							region: 'west',
							width: 300,
							title: 'общая информация',
							items: [
								numberField,
								examDateField,
								{
									xtype: 'fieldset',
									region: 'north',
									title: 'Регистрация в ГИБДД',
									items: [
										staffCombo,
										regDateField,
									]
								},
								{
									xtype: 'fieldset',
									region: 'north',
									title: 'Протокол',
									items: [
										protocolNumberField,
										protocolDateField,
									]
								}
							]
						},
						{
							xtype: 'fieldset',
							layout: 'border',
							region: 'center',
							title: 'список сдающих экзамен',
							items: [
								editStudentPanel,
								studentsGrid
							]
						}
					]
				});

				// var groupTabPanel = Ext.create('Ext.tab.Panel', {
					// id: 'groupTabPanel',
					// region: 'center',
					// layout: 'border',
					// border: false,
					// items: [
						// groupTab,
						// studentsTab
					// ]
				// })



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
                            url: 'AS_exam_group_gibdd_delete.php',
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
							url: 'AS_exam_group_gibdd_student_edit.php',
							success: done,
							failure: fail,
							params: {
								id: -1,
								student_operation_id: -1,
								exam_group_id: group.data.id,
								user_id: sessvars.userId
							}
						});
                    }

                    save();

                }

                function save() {

                    function fail(result, request) {
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        delNew();
                        is_new = 0;
                    }
                    
                    function done(result, request) {
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
                    Ext.Ajax.request({
                        url: 'AS_exam_group_gibdd_edit.php',
                        success: done,
                        failure: fail,
                        params: {
							id: id,
							group_type: '2',
							learning_group_id: group.data.learning_group_id,
							number: numberField.getValue(),
							exam_date: examDateField.getValue(),
							regist_date: regDateField.getValue(),
							staff_id: staffCombo.getValue(),
							protocol_number: protocolNumberField.getValue(),
							protocol_date: protocolDateField.getValue(),
							user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новая группа' : 'Редактирование группы',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    height: 600,
                    width: 1000,
                    items: [groupPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
							disabled: !checkUserRole('EGG_E'),
                            text: 'ОК',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
									if (numberField.getValue() == ''){
										Ext.Msg.alert('Ошибка', 'не задан номер группы');
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
                        'close': function (win) {//close( panel, eOpts )
                            delNew();
                        }
                    }
                }).show();
            }
        }
    });



}									