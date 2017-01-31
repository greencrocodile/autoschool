function exportDocument(learning_group_id,student_operation_id,individual_student_operation_id,test_date,test_staff_id,test_type_id,exam_school_group_id,exam_school_group_student_operation_id,exam_gibdd_group_id,list,callback) {

	function fail(result,request) {
		Ext.Msg.alert('Ошибка', 'При запуске операции экспорта произошла неизвестная ошибка. Попробуйте повторить операцию.');
	};

	function done(result,request) {
			if ((result.responseText) && (result.responseText.substring(0,2)=='ok')) {
				var value = result.responseText.substring(3);
				window.location.href='AS_save_file.php?file_id='+value;
				if(callback){callback()};
			} else {
				Ext.Msg.alert('Ошибка', 'При запуске операции экспорта произошла ошибка: '+((result.responseText=='')?'невозможно выполнить запрос к БД':result.responseText)+' <br/>Попробуйте повторить операцию.');
				return;
			}
	}
	Ext.Ajax.request({
		url: 'AS_prepare_document_for_export.php',
		success: done,
		failure: fail,
		params: {
			list: list,
			learning_group_id: learning_group_id,
			student_operation_id: student_operation_id,
			individual_student_operation_id: individual_student_operation_id,
			test_date: test_date,
			test_staff_id: test_staff_id,
			test_type_id: test_type_id,
			exam_school_group_id: exam_school_group_id,
			exam_school_group_student_operation_id: exam_school_group_student_operation_id,
			exam_gibdd_group_id: exam_gibdd_group_id,
			user_id: sessvars.userId
		}
	});
}
