function deleteGroupStaffVehicle(id, callback) {
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

    var staffVehiclesStore = Ext.create('Ext.data.Store', {
        model: 'GroupStaffVehiclesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_group_staff_vehicles_list.php',
            extraParams: {id: -1},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
        },
        pageSize: 10000000000
    });

    staffVehiclesStore.getProxy().extraParams = {id:id};
    staffVehiclesStore.load({
        callback: function (records, operation, success) {
            var staffVehicle = staffVehiclesStore.getById(id);
            if (staffVehicle) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + staffVehicle.data.staff_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_group_staff_vehicle_delete.php',
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