function deleteStaffSalaryArticleIn(id, callback) {
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

    var staffSalaryArticlesStore = Ext.create('Ext.data.Store', {
        model: 'StaffSalaryArticlesInModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_salary_articles_list.php',
            extraParams: {staff_id: -1, in_article: 1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 1000000000
    });

    staffSalaryArticlesStore.getProxy().extraParams = {staff_id: -1};
    staffSalaryArticlesStore.load({
        callback: function (records, operation, success) {
            var staffSalaryArticle = staffSalaryArticlesStore.getById(id);
            if (staffSalaryArticle) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + staffSalaryArticle.data.article_name_in + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_staff_salary_article_delete.php',
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

function deleteStaffSalaryArticleOut(id, callback) {
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

    var staffSalaryArticlesStore = Ext.create('Ext.data.Store', {
        model: 'StaffSalaryArticlesOutModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_salary_articles_list.php',
            extraParams: {staff_id: -1, in_article: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        },
        pageSize: 1000000000
    });

    staffSalaryArticlesStore.getProxy().extraParams = {staff_id: -1};
    staffSalaryArticlesStore.load({
        callback: function (records, operation, success) {
            var staffSalaryArticle = staffSalaryArticlesStore.getById(id);
            if (staffSalaryArticle) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + staffSalaryArticle.data.article_name_out + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_staff_salary_article_delete.php',
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