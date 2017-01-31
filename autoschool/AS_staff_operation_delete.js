function deleteStaffOperationIn(id, callback) {
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

    var staffOperationsStore = Ext.create('Ext.data.Store', {
        model: 'StaffOperationsInModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_operations_list.php',
            extraParams: {staff_id: -1, in_article: 1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 1000000000
    });

    staffOperationsStore.getProxy().extraParams = {staff_id: -1};
    staffOperationsStore.load({
        callback: function (records, operation, success) {
            var staffOperation = staffOperationsStore.getById(id);
            if (staffOperation) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + staffOperation.data.article_name_in + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_staff_operation_delete.php',
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

function deleteStaffOperationOut(id, callback) {
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

    var staffOperationsStore = Ext.create('Ext.data.Store', {
        model: 'StaffOperationsOutModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_operations_list.php',
            extraParams: {staff_id: -1, in_article: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 1000000000
    });

    staffOperationsStore.getProxy().extraParams = {staff_id: -1};
    staffOperationsStore.load({
        callback: function (records, operation, success) {
            var staffOperation = staffOperationsStore.getById(id);
            if (staffOperation) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + staffOperation.data.article_name_out + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_staff_operation_delete.php',
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