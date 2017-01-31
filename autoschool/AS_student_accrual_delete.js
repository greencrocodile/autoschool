function deleteStudentAccrual(id, callback) {
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

    var studentAccrualsStore = Ext.create('Ext.data.Store', {
        model: 'StudentAccrualsModel',
        proxy: {
			type: 'jsonp',
			url: 'AS_student_accruals_list.php',
			extraParams: {id: -1},
			simpleSortMode: true,
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
    });

    studentAccrualsStore.getProxy().extraParams = {id: id};
    studentAccrualsStore.load({
        callback: function (records, operation, success) {
            var accr = studentAccrualsStore.getById(id);
            if (accr) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + accr.data.payment_type_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_student_accrual_delete.php',
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
        }
    });
}