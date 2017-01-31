function deleteLGroup(id, callback) {
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

    var lGroupsStore = Ext.create('Ext.data.Store', {
        model: 'LGroupsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_lgroups_list.php',
            extraParams: {id: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });

    lGroupsStore.getProxy().extraParams = {id: id};
    lGroupsStore.load({
        callback: function (records, operation, success) {
            var group = lGroupsStore.getById(id);
            if (group) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + group.data.number + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_lgroup_delete.php',
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