function deleteWaybillStudent(id, callback) {
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

   var waybillStudentsStore = Ext.create('Ext.data.Store', {
		model: 'WaybillStudentsModel',
		proxy: {
			type: 'jsonp',
			url: 'AS_waybill_students_list.php',
			extraParams: {waybill_id: id},
			simpleSortMode: true,
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
		remoteSort: true,
		pageSize: 100,
		sorters: [{
				property: 'student_full_name',
				direction: 'ASC'
			}]
	});
	waybillStudentsStore.getProxy().extraParams = {id: id};
    waybillStudentsStore.load({
        callback: function (records, operation, success) {

            var waybillStudent = waybillStudentsStore.getById(id);
            if (waybillStudent) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + waybillStudent.data.student_full_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_waybill_student_delete.php',
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