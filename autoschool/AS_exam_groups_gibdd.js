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

    if (checkUserRole('EGG_R')) {

        //**********variables**********
        var selectedGibddExamGroupId = -1;



        //**********stores**********
        var gibddExamGroupsStore = Ext.create('Ext.data.Store', {
            model: 'GibddExamGroupsModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_exam_groups_gibdd_list.php',
				extraParams: {id: -1, school_unit_id: -1},
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

		gibddExamGroupsStore.getProxy().extraParams = {id: -1, school_unit_id: (sessvars.userPrivileges.indexOf('#EGG_AS#') == -1?sessvars.schoolUnitId:-1)};
        gibddExamGroupsStore.load();

       
        //**********grids**********
        var gibddExamGroupsGrid = Ext.create('Ext.grid.Panel', {
			region: 'center',
            store: gibddExamGroupsStore,
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
                    dataIndex: 'school_unit_name_short',
                    text: 'место',
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'exam_date',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    text: 'дата экзамена',
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'protocol_number',
                    text: 'номер протокола',
                    width: 100,
                    sortable: true
                }, {
                    dataIndex: 'protocol_date',
                    text: 'дата протокола',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width: 70,
                    sortable: true
                }, {
                    dataIndex: 'gibdd_reg_date',
                    text: 'дата регистрации',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width: 70,
                    sortable: true
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: gibddExamGroupsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            })
            ,
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
                        selectedGibddExamGroupId = record.data.id;
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
						selectedGibddExamGroupId = record.data.id;
						if (checkUserRole('EGG_R')){
							editGibddExamGroup(record.data.id, 0, function(){
								gibddExamGroupsStore.reload();
							});
						}
                    }
                }
            }
        })

        //**********panels**********

        var panelEGG = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Экзамены ГИБДД&nbsp;</span>'
                }
            ]
        });

        var editGibddExamGroupPanel = Ext.create('Ext.panel.Panel', {
			region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'button',
                    text: 'Новая группа',
                    margin: '5 5 5 5',
                    listeners: {
                        click: function () {
							addGroup(function(id){
									editGibddExamGroup(id,1,function(){
											gibddExamGroupsStore.reload();
										}
									)
								}	
							)
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить группу',
                    margin: '5 5 5 5',
                    listeners: {
                        click: function () {
							deleteGibddExamGroup(selectedGibddExamGroupId);
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
							if (selectedGibddExamGroupId != -1){
								exportDocuments(-1,-1,-1,null,-1,-1,-1,-1,selectedGibddExamGroupId,'gibdd_exam_documents', function () {})
							}
                        }
					}
                }
            ]
        });

        // var editExamGroupSchoolStudentPanel = Ext.create('Ext.panel.Panel', {
            // border: false,
            // bodyCls: 'alt-background',
            // items: [
                // {
                    // xtype: 'button',
                    // text: 'Добавить студента',
                    // margin: '5 5 5 5',
                    // listeners: {
                        // click: function () {
                            // if (newExamGroupSchoolId != -1) {
                                // groupId = newExamGroupSchoolId;
                            // } else {
                                // groupId = selectedExamGroupSchoolId;
                            // }
                            // editExamGroupSchoolStudents(-1, groupId, -1, '0', '0',
                                    // function (id) {
                                        // examGroupSchoolStudentsStore.reload();
                                    // })
                        // }
                    // }
                // },
                // {
                    // xtype: 'button',
                    // text: 'Удалить студента',
                    // margin: '5 5 5 5',
                    // listeners: {
                        // click: function () {
                            // Ext.MessageBox.confirm('Confirm', 'Удалить?', function (btn) {
                                // function done(result, request) {
                                    // examGroupSchoolStudentsStore.reload({
                                        // callback: function (records, operation, success) {
                                            // selectedExamGroupSchoolStudentId = -1;
                                        // }
                                    // })
                                // }
                                // function fail(result, request) {
                                    // Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                                // }
                                // ;
                                // if (btn == 'yes') {
                                    // Ext.Ajax.request({
                                        // url: 'AS_exam_group_school_student_delete.php',
                                        // success: done,
                                        // failure: fail,
                                        // params: {
                                            // id: selectedExamGroupSchoolStudentId,
                                            // user_id: sessvars.userId
                                        // }
                                    // });
                                // }
                            // })
                        // }
                    // }
                // },
                // {
                    // xtype: 'button',
                    // text: 'Выдать сертификаты',
                    // margin: '5 5 5 5',
                    // listeners: {
                        // click: function () {
                            // if (newExamGroupSchoolId != -1) {
                                // groupId = newExamGroupSchoolId;
                            // } else {
                                // groupId = selectedExamGroupSchoolId;
                            // }
                            // setExamGroupCertificates(groupId,
                                    // function (id) {
                                        // examGroupSchoolStudentsStore.reload();
                                    // })
                        // }
                    // }
                // }
            // ]
        // });

        var gibddExamGroupsListPanel = Ext.create('Ext.panel.Panel', {
			layout: 'border',
			region: 'center',
            bodyCls: 'alt-background',
            id: 'gibddExamGroupsListPanel',
            items: [
                editGibddExamGroupPanel,
                gibddExamGroupsGrid
            ]
        });

        // var examGroupSchoolTabPanelGroupTab = Ext.create('Ext.panel.Panel', {
            // title: 'Группа',
            // bodyCls: 'alt-background',
            // id: 'examGroupSchoolTabPanelGroupTab',
            // items: [
                // examGroupSchoolNumberField,
                // examGroupSchoolExamDateField,
                // examGroupSchoolUnitsCombo,
                // {
                    // xtype: 'fieldset',
                    // title: 'Регистрация в ГИБДД',
                    // width: 500,
                    // items: [
                        // examGroupSchoolRespStaffCombo,
                        // examGroupSchoolGibddRegDateField,
                    // ]
                // },
                // {
                    // xtype: 'fieldset',
                    // title: 'Протокол',
                    // width: 500,
                    // items: [
                        // examGroupSchoolProtocolNumberField,
                        // examGroupSchoolProtocolDateField,
                    // ]
                // },
                // {
                    // xtype: 'fieldset',
                    // title: 'Студенты',
                    // width: 1000,
                    // items: [
                        // editExamGroupSchoolStudentPanel,
                        // examGroupsSchoolStudentsGrid,
                    // ]
                // },
                // Ext.create('Ext.form.Panel', {
                    // bodyCls: 'alt-background',
                    // border: false,
                    // items: [
                        // {
                            // xtype: 'button',
                            // text: 'сохранить'
                            // ,
                            // listeners: {
                                // click: function () {
                                    // if (newExamGroupSchoolId != -1) {
                                        // id = newExamGroupSchoolId;
                                    // } else {
                                        // id = selectedExamGroupSchoolId;
                                    // }

                                    // saveExamGroupSchoolData(id
                                            // , examGroupSchoolNumberField.getValue()
                                            // , selectedLearningGroupId
                                            // , examGroupSchoolExamDateField.getValue()
                                            // , examGroupSchoolProtocolNumberField.getValue()
                                            // , examGroupSchoolProtocolDateField.getValue()
                                            // , examGroupSchoolUnitsCombo.getValue()
                                            // , examGroupSchoolRespStaffCombo.getValue()
                                            // , examGroupSchoolGibddRegDateField.getValue()
                                            // , function (id) {
                                                // selectedExamGroupSchoolId = id;
                                                // newExamGroupSchoolId = -1;
                                                // Ext.getCmp('examGroupSchoolTabPanelListTab').enable();
                                            // });
                                // }
                            // }
                        // },
                        // {
                            // xtype: 'button',
                            // text: 'отменить',
                            // listeners: {
                                // click: function () {
                                    // if (newExamGroupSchoolId != -1) {
                                        // Ext.Ajax.request({
                                            // url: 'AS_exam_group_school_delete.php',
                                            // params: {
                                                // id: newExamGroupSchoolId,
                                                // hard_delete: 1,
                                                // user_id: sessvars.userId
                                            // }
                                        // });
                                        // newExamGroupSchoolId = -1;
                                        // Ext.getCmp('examGroupSchoolTabPanelListTab').enable();
                                        // Ext.getCmp('examGroupSchoolTabPanelGroupTab').disable();

                                    // } else {
                                        // clearExamGroupSchoolFields();
                                    // }
                                    // examGroupSchoolTabPanel.setActiveTab('examGroupSchoolTabPanelListTab');
                                    // onexamGroupSchoolTabPanelListTabHeaderClick();
                                // }
                            // }
                        // }
                    // ]
                // })
            // ]
        // });

        // var examGroupSchoolTabPanel = Ext.create('Ext.tab.Panel', {
            // id: 'examGroupSchoolTabPanel',
            // region: 'center',
            // border: false,
            // renderTo: Ext.getBody(),
            // items: [
                // examGroupSchoolTabPanelListTab
                        // ,
                // examGroupSchoolTabPanelGroupTab
            // ]
        // })

        // Ext.getCmp('examGroupSchoolTabPanelGroupTab').disable();

        // var onexamGroupSchoolTabPanelListTabHeaderClick = function (btn, e) {
            // examGroupsSchoolStore.load({
                // callback: function (records, operation, success) {
                    // var rowIndex = this.find('id', selectedExamGroupSchoolId);
                    // examGroupsSchoolGrid.getView().select(rowIndex);
                    // loadExamGroupSchoolData(selectedExamGroupSchoolId);
                // }
            // })
        // };

        // examGroupSchoolTabPanelListTab.tab.on('click', onexamGroupSchoolTabPanelListTabHeaderClick);

        //***********functions**********

		function addGroup(callback) {
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
					url: 'AS_exam_group_gibdd_edit.php',
					success: done,
					failure: fail,
					params: {
						id: -1,
						group_type: '2',
						learning_group_id: -1,
						number: '',
						exam_date: '',
						regist_date: '',
						staff_id: -1,
						protocol_number: '',
						protocol_date: '',
						user_id: sessvars.userId
					}
				});
			}

			save();

		}
        // function loadExamGroupSchoolData(id) {
            // var group = examGroupsSchoolStore.getById(id);
            // if (group) {
                // examGroupSchoolGibddRegStaffStore.reload({
                    // callback: function (records, operation, success) {
                        // if (group.get('gibdd_reg_staff_id') == 0) {
                            // examGroupSchoolRespStaffCombo.setValue(-1);
                        // } else {
                            // examGroupSchoolRespStaffCombo.setValue(group.get('gibdd_reg_staff_id'));
                        // }
                    // }
                // });

                // examSchoolGroupSchoolUnitsStore.reload({
                    // callback: function (records, operation, success) {
                        // if (group.get('school_unit_id') == 0) {
                            // examGroupSchoolUnitsCombo.setValue(-1);
                        // } else {
                            // examGroupSchoolUnitsCombo.setValue(group.get('school_unit_id'));
                        // }
                    // }
                // })


                // examGroupSchoolNumberField.setValue(group.get('number'));
                // examGroupSchoolExamDateField.setValue(group.get('exam_date'));
                // examGroupSchoolProtocolNumberField.setValue(group.get('protocol_number'));
                // examGroupSchoolProtocolDateField.setValue(group.get('protocol_date'));
                // examGroupSchoolGibddRegDateField.setValue(group.get('gibdd_reg_date'));
                // examGroupSchoolStudentsStore.getProxy().extraParams = {group_id: id};
                // examGroupSchoolStudentsStore.load();

            // } else {
                // clearExamGroupSchoolFields();
                // Ext.getCmp('examGroupSchoolTabPanelGroupTab').disable();
                // examGroupSchoolTabPanel.setActiveTab('examGroupSchoolTabPanelListTab');
            // }

        // }

        // function clearExamGroupSchoolFields() {
            // examGroupSchoolNumberField.setValue('');
            // examGroupSchoolExamDateField.setValue('');
            // examGroupSchoolProtocolNumberField.setValue('');
            // examGroupSchoolProtocolDateField.setValue('');
            // examGroupSchoolGibddRegDateField.setValue('');

            // examGroupSchoolStudentsStore.getProxy().extraParams = {group_id: -1};
            // examGroupSchoolStudentsStore.load();

            // examGroupSchoolGibddRegStaffStore.reload({
                // callback: function (records, operation, success) {
                    // examGroupSchoolRespStaffCombo.setValue(-1);
                // }
            // });

            // examSchoolGroupSchoolUnitsStore.reload({
                // callback: function (records, operation, success) {
                    // examGroupSchoolUnitsCombo.setValue(-1);
                // }
            // })

        // }

        // function saveExamGroupSchoolData(id, number, learning_group_id, exam_date, protocol_number, protocol_date, school_unit_id, gibdd_reg_staff_id, gibdd_reg_date, callback) {
            // function done(result, request) {
                // examGroupSchoolTabPanel.body.unmask();
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
                // examGroupSchoolTabPanel.body.unmask();
                // Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
            // }
            // ;
            // function save() {
                // examGroupSchoolTabPanel.body.mask('Сохранение...');
                // Ext.Ajax.request({
                    // url: 'AS_exam_group_school_edit.php',
                    // success: done,
                    // failure: fail,
                    // params: {
                        // id: id
                        // , number: number
                        // , learning_group_id: learning_group_id
                        // , exam_date: exam_date
                        // , protocol_number: protocol_number
                        // , protocol_date: protocol_date
                        // , school_unit_id: school_unit_id
                        // , gibdd_reg_staff_id: gibdd_reg_staff_id
                        // , gibdd_reg_date: gibdd_reg_date
                        // , user_id: sessvars.userId
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
                                    // if (selectedExamGroupSchoolId != -1) {
                                        // loadExamGroupSchoolData(selectedExamGroupSchoolId);
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

        // function editExamGroupSchoolStudents(id, group_id, student_id, theory_result, practice_result, callback) {
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

            // Ext.define("TheoryResults", {
                // extend: 'Ext.data.Model',
                // fields: [
                    // 'id',
                    // 'name'
                // ]
            // });

            // Ext.define("PracticeResults", {
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
                        // studentsCombo.setValue(student_id);
                    // }
                // }
            // });
            // studentsStore.load();

            // var theoryResultsStore = Ext.create('Ext.data.Store', {
                // model: 'TheoryResults',
                // data: [
                    // {id: '0', name: '-----'},
                    // {id: '1', name: '1'},
                    // {id: '2', name: '2'},
                    // {id: '3', name: '3'},
                    // {id: '4', name: '4'},
                    // {id: '5', name: '5'},
                // ]
            // });

            // var practiceResultsStore = Ext.create('Ext.data.Store', {
                // model: 'PracticeResults',
                // data: [
                    // {id: '0', name: '-----'},
                    // {id: '1', name: '1'},
                    // {id: '2', name: '2'},
                    // {id: '3', name: '3'},
                    // {id: '4', name: '4'},
                    // {id: '5', name: '5'},
                // ]
            // });


            // var studentsCombo = Ext.create('Ext.form.ComboBox', {
                // fieldLabel: 'Студент',
                // store: studentsStore,
                // queryMode: 'local',
                // displayField: 'full_name_with_group',
                // valueField: 'id',
                // margin: '5 5 5 5',
                // editable: false
            // });

            // var theoryResultsCombo = Ext.create('Ext.form.ComboBox', {
                // fieldLabel: 'Теория',
                // store: theoryResultsStore,
                // queryMode: 'local',
                // displayField: 'name',
                // valueField: 'id',
                // margin: '5 5 5 5',
                // editable: false
            // });

            // theoryResultsCombo.setValue(theory_result);

            // var practiceResultsCombo = Ext.create('Ext.form.ComboBox', {
                // fieldLabel: 'Практика',
                // store: practiceResultsStore,
                // queryMode: 'local',
                // displayField: 'name',
                // valueField: 'id',
                // margin: '5 5 5 5',
                // editable: false
            // });

            // practiceResultsCombo.setValue(practice_result);

            // var fieldsPanel = Ext.create('Ext.form.Panel', {
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
                    // studentsCombo,
                    // theoryResultsCombo,
                    // practiceResultsCombo
                // ]
            // });

            // var formPanel = Ext.create('Ext.form.Panel', {
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
                    // url: 'AS_exam_group_school_result_edit.php',
                    // success: done,
                    // failure: fail,
                    // params: {
                        // id: id,
                        // group_id: group_id,
                        // student_id: studentsCombo.getValue(),
                        // theory_result: theoryResultsCombo.getValue(),
                        // practice_result: practiceResultsCombo.getValue(),
                        // user_id: sessvars.userId
                    // }
                // });
            // }

            // var win = new Ext.Window({
                // title: (id == -1) ? 'Новая запись' : 'Редактирование',
                // layout: 'fit',
                // resizable: false,
                // modal: true,
                // height: 200,
                // width: 500,
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

        // function setExamGroupCertificates(group_id, callback) {
            // Ext.define("LastCertificateSerialNumberModel", {
                // extend: 'Ext.data.Model',
                // proxy: {
                    // type: 'jsonp',
                    // url: 'AS_last_certificate_serial_number.php',
                    // reader: {
                        // type: 'json',
                        // root: 'list'
                    // },
                    // pageSize: 0
                // },
                // fields: [
                    // 'serial',
                    // {name: 'number', type: 'int'}
                // ]
            // });

            // var lastCertificateNumberStore = Ext.create('Ext.data.Store', {
                // model: 'LastCertificateSerialNumberModel'
            // });

            // lastCertificateNumberStore.load({
                // callback: function (records, operation, success) {
                    // rec = lastCertificateNumberStore.first();
                    // serialField.setValue(rec.get('serial'));
                    // numberField.setValue(rec.get('number'));
                // }
            // });

            // var serialField = Ext.create('Ext.form.field.Text', {
                // fieldLabel: 'серия',
                // allowBlank: false
            // })

            // var numberField = Ext.create('Ext.form.field.Number', {
                // fieldLabel: 'номер',
                // allowDecimal: false,
                // allowBlank: false
            // })

            // var fieldsPanel = Ext.create('Ext.form.Panel', {
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
                    // serialField,
                    // numberField
                // ]
            // });

            // var formPanel = Ext.create('Ext.form.Panel', {
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
                    // if (result.responseText == 'ok') {
                        // if (callback) {
                            // callback()
                        // }
                        // win.close();
                    // } else {
                        // Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        // return;
                    // }
                // }
                // formPanel.body.mask('Сохранение...');
                // Ext.Ajax.request({
                    // url: 'AS_set_exam_group_certificates.php',
                    // success: done,
                    // failure: fail,
                    // params: {
                        // group_id: group_id,
                        // serial: serialField.getValue(),
                        // number: numberField.getValue(),
                        // user_id: sessvars.userId
                    // }
                // });
            // }

            // var win = new Ext.Window({
                // title: 'Задайте начальный номер сертификата',
                // layout: 'fit',
                // resizable: false,
                // modal: true,
                // height: 200,
                // width: 500,
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

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelEGG,
                gibddExamGroupsListPanel
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
