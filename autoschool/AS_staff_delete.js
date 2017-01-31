function deleteStaff(id, callback) {
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

    var staffStore = Ext.create('Ext.data.Store', {
        model: 'StaffModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_list.php',
            extraParams: {id: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });

    staffStore.getProxy().extraParams = {id: id};
    staffStore.load({
        callback: function (records, operation, success) {
            var staff = staffStore.getById(id);
            if (staff) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + staff.data.full_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_staff_delete.php',
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