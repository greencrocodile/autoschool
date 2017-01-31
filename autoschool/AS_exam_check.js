function checkStudentSuccessfullExam(student_operation_id, exam_type, callback) {
	var exam_type_id = -1;
	
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
			var variable = variablesStore.getById(exam_type);
			exam_type_id = variable.data.value;
	
			var examSuccessStore = Ext.create('Ext.data.Store', {
				model: 'StudentCheckSuccessExamModel',
				remoteSort: true,
				proxy: {
					type: 'jsonp',
					url: 'AS_check_student_success_exam.php',
					extraParams: {student_operation_id: -1, exam_type_id: -1},
					simpleSortMode: true,
					reader: {
						root: 'list'
					}
				}
			});
			examSuccessStore.getProxy().extraParams = {student_operation_id: student_operation_id, exam_type_id: exam_type_id};
			examSuccessStore.load({
				callback: function (records, operation, success) {
					var variable = examSuccessStore.getById(student_operation_id);
					if (callback) {
						callback(variable.data.exam_exists);
					}
				}
			})
		}
	})
}

function checkStudentSuccessfullTest(student_operation_id, exam_type_id, callback) {

	
	var examSuccessStore = Ext.create('Ext.data.Store', {
		model: 'StudentCheckSuccessExamModel',
		remoteSort: true,
		proxy: {
			type: 'jsonp',
			url: 'AS_check_student_success_exam.php',
			extraParams: {student_operation_id: -1, exam_type_id: -1},
			simpleSortMode: true,
			reader: {
				root: 'list'
			}
		}
	});
	examSuccessStore.getProxy().extraParams = {student_operation_id: student_operation_id, exam_type_id: exam_type_id};
	examSuccessStore.load({
		callback: function (records, operation, success) {
			var variable = examSuccessStore.getById(student_operation_id);
			if (callback) {
				callback(variable.data.exam_exists);
			}
		}
	})

}

function checkStudentAllowExam(student_operation_id, exam_type, callback) {
	var exam_type_id = -1;
	
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
			var variable = variablesStore.getById(exam_type);
			exam_type_id = variable.data.value;
			
			var examAllowedStore = Ext.create('Ext.data.Store', {
				model: 'StudentCheckExamAllowedModel',
				remoteSort: true,
				proxy: {
					type: 'jsonp',
					url: 'AS_check_student_exam_allowed.php',
					extraParams: {student_operation_id: -1, exam_type_id: -1},
					simpleSortMode: true,
					reader: {
						root: 'list'
					}
				}
			});
			examAllowedStore.getProxy().extraParams = {student_operation_id: student_operation_id, exam_type_id: exam_type_id};
			examAllowedStore.load({
				callback: function (records, operation, success) {
					var variable = examAllowedStore.getById(student_operation_id);
					console.log('exam_allowed '+variable.data.exam_allowed);
					if (callback) {
						callback(variable.data.exam_allowed);
					}
				}
			})
		}
	})
}
