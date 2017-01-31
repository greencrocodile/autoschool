function deleteSchoolExamStudent(id, callback) {
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
					
				studentsStore.getProxy().extraParams = {id: studentResult.data.student_operation_id};
				studentsStore.load({
					callback: function (records, operation, success) {
						var student = studentsStore.getById(studentResult.data.student_operation_id);
						Ext.MessageBox.confirm('Подтверждение', 'Удалить студента '+student.data.full_name_with_group+' из экзаменационной группы?', function (btn) {
							if (btn == 'yes') {
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
								
								Ext.Ajax.request({
									url: 'AS_exam_group_school_student_delete.php',
									success: done,
									failure: fail,
									params: {
										id: id,
										user_id: sessvars.userId
									}
								});
							}
						});
					}
				});
            }
        }
    });



}