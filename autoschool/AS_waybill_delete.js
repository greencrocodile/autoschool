function deleteWaybill(id, callback) {
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

	var waybillsStore = Ext.create('Ext.data.Store', {
		model: 'WaybillsModel',
		proxy: {
			type: 'jsonp',
			url: 'AS_waybills_list.php',
			simpleSortMode: true,
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
		remoteSort: true,
		pageSize: 100,
		sorters: [{
			property: 'date',
			direction: 'DESC'
		}]
	});

    waybillsStore.getProxy().extraParams = {id: id};
    waybillsStore.load({
        callback: function (records, operation, success) {
            var waybill = waybillsStore.getById(id);
            if (waybill) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + waybill.data.number + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_waybill_delete.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: id,
                                hard_delete: 1,
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