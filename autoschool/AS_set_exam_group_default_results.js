function setExamGroupDefaultResults(id, callback) {

    function fail(result, request) {
        Ext.Msg.alert('Ошибка', 'При изменении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
    }

    function done(result, request) {
        if (result.responseText == 'ok') {
            if (callback) {
                callback()
            }

        } else {
            Ext.Msg.alert('Ошибка', 'При изменении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }

    }

	Ext.MessageBox.confirm('Подтверждение', 'Проставить оценки?', function (btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url: 'AS_set_exam_group_default_results.php',
				success: done,
				failure: fail,
				params: {
					id: id,
					user_id: sessvars.userId
				}
			});
		} else {
			if (callback) {
				callback();
			}
		}
	});

}
