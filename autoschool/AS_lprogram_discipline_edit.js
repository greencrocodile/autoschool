function editLProgramDiscipline(id, is_new, callback) {
//*********variables**********

//**********stores**********

    var lProgramDiscipliinesStore = Ext.create('Ext.data.Store', {
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
        pageSize: 1000000000
    });

    lProgramDiscipliinesStore.getProxy().extraParams = {learning_program_id: -1};
    lProgramDiscipliinesStore.load({
        callback: function (records, operation, success) {
            var programDisc = lProgramDiscipliinesStore.getById(id);
            if (programDisc) {
                var lDisciplinesStore = Ext.create('Ext.data.Store', {
                    model: 'LDisciplinesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_ldisciplines_list.php',
                        extraParams: {start_id: -1, parent_id: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    remoteSort: true,
                    pageSize: 1000000000,
                    sorters: [{
                            property: 'name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            lDisciplinesCombo.setValue(programDisc.data.learning_discipline_id);
                        }
                    }
                });

                lDisciplinesStore.getProxy().extraParams = {start_id: -1, parent_id: -1};
                lDisciplinesStore.load();

                //**********fields**********

                var lDisciplinesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Дисциплина',
                    store: lDisciplinesStore,
                    queryMode: 'local',
                    displayField: 'full_name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
                });

                var lDisciplineHours = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'кол-во часов',
                    allowBlank: true,
                    allowDecimal: false,
                    minValue: 0,
                    margin: '5 5 5 5',
                    value: programDisc.data.hours
                });


                //**********panels**********



                var fieldsPanel = Ext.create('Ext.form.Panel', {
                    border: false,
                    bodyPadding: 5,
                    region: 'north',
                    bodyCls: 'alt-background',
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 150,
                        anchor: '100%'
                    },
                    items: [
                        lDisciplinesCombo,
                        lDisciplineHours
                    ]
                });

                var formPanel = Ext.create('Ext.form.Panel', {
                    frame: false,
                    border: false,
                    layout: 'border',
                    items: [fieldsPanel]
                })

                function delNew(callback) {
                    function done(result, request) {
                        if (result.responseText == 'ok') {
                            if (callback) {
                                callback()
                            }
                        }
                    }

                    if (is_new == 1) {
                        Ext.Ajax.request({
                            url: 'AS_lprogram_discipline_delete.php',
                            success: done,
                            params: {
                                id: id,
                                user_id: sessvars.userId
                            }
                        });
                    }
                }

                function save() {

                    function fail(result, request) {
                        formPanel.body.unmask();
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        delNew();
                        is_new = 0;
                    }

                    function done(result, request) {
                        formPanel.body.unmask();
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback(parseInt(result.responseText.substr(3)))
                            }
                            is_new = 0;
                            win.close();
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                            // delNew();
                            // is_new = 0;
                            return;
                        }
                    }
                    formPanel.body.mask('Сохранение...');
                    Ext.Ajax.request({
                        url: 'AS_lprogram_discipline_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            program_id: programDisc.data.learning_program_id,
                            discipline_id: lDisciplinesCombo.getValue(),
                            hours: lDisciplineHours.getValue(),
                            user_id: sessvars.userId
                        }
                    });

                }

                var win = new Ext.Window({
                    title: (id == -1) ? 'Новая дисциплина' : 'Редактирование дисциплины',
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    autoScroll: true,
                    height: 150,
                    width: 400,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
                            text: 'ОК',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
                                    if (lDisciplinesCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбрана дисциплина');
                                        return;
                                    }
                                    save();
                                }
                            }
                        }, {
                            xtype: 'button',
                            text: 'Отмена',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
                                    delNew(function () {
                                        if (callback) {
                                            callback()
                                        }
                                    });
                                    win.close();
                                }
                            }
                        }

                    ],
                    listeners: {
                        'close': function (win) {
                            delNew();
                        }
                    }
                }).show();
            }
        }
    });


}