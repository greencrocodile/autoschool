function deleteVehicle(id, callback) {
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

    var vehiclesStore = Ext.create('Ext.data.Store', {
        model: 'VehiclesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_vehicles_list.php',
            extraParams: {id:-1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 10000000000
    });

    vehiclesStore.getProxy().extraParams = {id:id};
    vehiclesStore.load({
        callback: function (records, operation, success) {
            var vehicle = vehiclesStore.getById(id);
            if (vehicle) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + vehicle.data.vehicle_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_vehicle_delete.php',
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