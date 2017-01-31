function editSchoolExamStudent(id, is_new, callback) {
//*********variables**********

//**********stores**********
    var studentsExamResultsStore = Ext.create('Ext.data.Store', {
        model: 'SchoolExamGroupResultsModel',
		proxy: {
			type: 'jsonp',
			url: 'AS_exam_group_school_results_list.php',
			simpleSortMode: true,
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
        pageSize: 1000000000
    });

    studentsExamResultsStore.getProxy().extraParams = {id:id};
    studentsExamResultsStore.load({
        callback: function (records, operation, success) {
            var studentResult = studentsExamResultsStore.getById(id);
            if (studentResult) {

                var studentsStore = Ext.create('Ext.data.Store', {
                    model: 'StudentsOperationsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_students_operations_list.php',
                        extraParams: {start_id: -1, active_only: 1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            studentsCombo.setValue(studentResult.data.student_operation_id);
                        }
                    }
                });
				studentsStore.getProxy().extraParams = {start_id: -1, active_only: 1, for_school_exam: 1};
				studentsStore.load();				
				
				var studentsCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'студент',
                    store: studentsStore,
                    queryMode: 'local',
                    displayField: 'full_name_with_group',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
                });
				
				//**********panels**********

                var fieldsPanel = Ext.create('Ext.form.Panel', {
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
                        studentsCombo
                    ]
                });

                var formPanel = Ext.create('Ext.form.Panel', {
                    border: false,
                    layout: 'border',
                    items: [fieldsPanel]
                })


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
                            url: 'AS_exam_group_school_student_delete.php',
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
                            // delNew();
                            // is_new = 0;
                            return;
                        }
                    }
                    formPanel.body.mask('Сохранение...');
                    Ext.Ajax.request({
                        url: 'AS_exam_group_school_student_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
							exam_group_id: studentResult.data.exam_group_id,
                            student_operation_id: studentsCombo.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Добавление' : 'Редактирование',
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    autoScroll: true,
                    height: 150,
                    width: 500,
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
                                    
									if (studentsCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбран студент');
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