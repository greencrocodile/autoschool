function deleteLProgramPrice(id, callback) {
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


    Ext.MessageBox.confirm('Подтверждение', 'Удалить?', function (btn) {
        if (btn == 'yes') {
            Ext.Ajax.request({
                url: 'AS_lprogram_price_history_delete.php',
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