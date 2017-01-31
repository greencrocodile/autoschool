function deleteLProgram(id, callback) {
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

    var lProgramsStore = Ext.create('Ext.data.Store', {
        model: 'LProgramsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_lprograms_list.php',
            extraParams: {id: 0},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            }
        },
        pageSize: 10000000000
    });

    lProgramsStore.getProxy().extraParams = {id: id};
    lProgramsStore.load({
        callback: function (records, operation, success) {
            var program = lProgramsStore.getById(id);
            if (program) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + program.data.name_full + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_lprogram_delete.php',
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