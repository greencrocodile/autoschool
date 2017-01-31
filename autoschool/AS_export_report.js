function exportReport(list,salary_month,salary_year,dds_school_unit_id,dds_payment_date_from,dds_payment_date_till,callback) {

	function fail(result,request) {
		Ext.Msg.alert('Ошибка', 'При запуске операции экспорта произошла неизвестная ошибка. Попробуйте повторить операцию.');
		if(callback){callback()}
	};

	function done(result,request) {
			if ((result.responseText) && (result.responseText.substring(0,2)=='ok')) {
				var value = result.responseText.substring(3);
				if(callback){callback()}
				window.location.href='AS_save_file.php?file_id='+value;
			} else {
				Ext.Msg.alert('Ошибка', 'При запуске операции экспорта произошла ошибка: '+((result.responseText=='')?'невозможно выполнить запрос к БД':result.responseText)+' <br/>Попробуйте повторить операцию.');
				if(callback){callback()}
				return;
			}
	}
	console.log('dds_school_unit_id = '+dds_school_unit_id+', dds_payment_date_from = '+dds_payment_date_from+', dds_payment_date_till = '+dds_payment_date_till);
	Ext.Ajax.request({
		url: 'AS_prepare_report_for_export.php',
		success: done,
		failure: fail,
		params: {
			list: list,
			salary_month: salary_month,
			salary_year: salary_year,
			dds_school_unit_id: dds_school_unit_id,
			dds_payment_date_from: dds_payment_date_from,
			dds_payment_date_till: dds_payment_date_till,
			user_id: sessvars.userId
		}
	});		
}
