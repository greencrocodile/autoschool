function deleteGroupStaffDiscipline(id, callback) {
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

    var staffDisciplinesStore = Ext.create('Ext.data.Store', {
        model: 'GroupStaffDisciplinesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_group_staff_disciplines_list.php',
            extraParams: {id: -1},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
        },
        pageSize: 10000000000
    });

    staffDisciplinesStore.getProxy().extraParams = {id:id};
    staffDisciplinesStore.load({
        callback: function (records, operation, success) {
            var staffDiscipline = staffDisciplinesStore.getById(id);
            if (staffDiscipline) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + staffDiscipline.data.learning_discipline_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_group_staff_discipline_delete.php',
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