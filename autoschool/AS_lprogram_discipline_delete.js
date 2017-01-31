function deleteLProgramDiscipline(id, callback) {
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

    var lProgramDisciplinesStore = Ext.create('Ext.data.Store', {
        model: 'LProgramDisciplinesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_lprogram_disciplines_list.php',
            extraParams: {learning_program_id: 0},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            }
        },
        pageSize: 10000000000
    });

    lProgramDisciplinesStore.getProxy().extraParams = {start_id: 0, active_only: 0};
    lProgramDisciplinesStore.load({
        callback: function (records, operation, success) {
            var programDisc = lProgramDisciplinesStore.getById(id);
            if (programDisc) {
                Ext.MessageBox.confirm('Подтверждение', 'Удалить ' + programDisc.data.learning_discipline_name + '?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'AS_lprogram_discipline_delete.php',
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