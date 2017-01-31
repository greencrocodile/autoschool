function deleteDocument(id, callback) {

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
    var documentsStore = Ext.create('Ext.data.Store', {
        model: 'DocumentsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_documents_list.php',
            extraParams: {id: -1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });

    documentsStore.getProxy().extraParams = {id: id};
    documentsStore.load({
        callback: function (records, operation, success) {
            var doc = documentsStore.getById(id);
            if (doc) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + doc.data.name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_document_delete.php',
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
