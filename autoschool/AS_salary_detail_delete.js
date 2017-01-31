function deleteSalaryDetailIn(id, callback) {
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

	var salaryDetailsInStore = Ext.create('Ext.data.Store', {
        model: 'SalaryDetailsInModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_salary_details_in_list.php',
            extraParams: {id: -1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 1000000000
    });

    salaryDetailsInStore.getProxy().extraParams = {id: id};
    salaryDetailsInStore.load({
        callback: function (records, operation, success) {
            var salaryDetailsIn = salaryDetailsInStore.getById(id);
            if (salaryDetailsIn) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + salaryDetailsIn.data.article_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_salary_detail_delete.php',
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

function deleteSalaryDetailOut(id, callback) {
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

	var salaryDetailsOutStore = Ext.create('Ext.data.Store', {
        model: 'SalaryDetailsOutModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_salary_details_out_list.php',
            extraParams: {id: -1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 1000000000
    });

    salaryDetailsOutStore.getProxy().extraParams = {id: id};
    salaryDetailsOutStore.load({
        callback: function (records, operation, success) {
            var salaryDetailsOut = salaryDetailsOutStore.getById(id);
            if (salaryDetailsOut) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + salaryDetailsOut.data.article_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_salary_detail_delete.php',
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