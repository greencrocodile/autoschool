function deleteUser(id, callback) {
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

	var usersStore = Ext.create('Ext.data.Store', {
		model: 'UsersModel',
		proxy: {
			type: 'jsonp',
			url: 'AS_users_list.php',
			simpleSortMode: true,
			extraParams: {start_id: 0, active_only: 1},
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
		remoteSort: true,
		pageSize: 1000000000
	});
	
	usersStore.load();

    usersStore.getProxy().extraParams = {id: id};
    usersStore.load({
        callback: function (records, operation, success) {
            var user = usersStore.getById(id);
            if (user) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + user.data.full_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_user_delete.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: id,
                                hard_delete: 0,
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