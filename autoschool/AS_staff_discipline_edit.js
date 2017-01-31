function editStaffDiscipline(id, is_new, callback) {
//*********variables**********

//**********stores**********
    var staffDisciplinesStore = Ext.create('Ext.data.Store', {
        model: 'StaffDisciplinesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_disciplines_list.php',
            extraParams: {staff_id: -1},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
        },
        pageSize: 1000000000
    });

    staffDisciplinesStore.getProxy().extraParams = {id: id};
    staffDisciplinesStore.load({
        callback: function (records, operation, success) {
            var staffDiscipline = staffDisciplinesStore.getById(id);
            if (staffDiscipline) {

                var disciplinesStore = Ext.create('Ext.data.Store', {
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
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            disciplinesCombo.setValue(staffDiscipline.data.learning_discipline_id);
                        }
                    }
                });

                disciplinesStore.getProxy().extraParams = {start_id: -1};
                disciplinesStore.load();

                var disciplinesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Дисциплина',
                    store: disciplinesStore,
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

                var staffDisciplineDateStartField = Ext.create('Ext.form.field.Date', {
                    fieldLabel: 'дата начала преподавания',
                    format: 'd.m.Y',
                    margin: '5 5 5 5',
                    value: staffDiscipline.data.date_start
                });

                var staffDisciplineDateCertificationField = Ext.create('Ext.form.field.Date', {
                    fieldLabel: 'дата  аттестации',
                    format: 'd.m.Y',
                    margin: '5 5 5 5',
                    value: staffDiscipline.data.date_certification
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
                        disciplinesCombo,
                        staffDisciplineDateStartField,
                        staffDisciplineDateCertificationField
                    ]
                });

                var formPanel = Ext.create('Ext.form.Panel', {
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
                            url: 'AS_staff_discipline_delete.php',
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
                        url: 'AS_staff_discipline_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            staff_id: staffDiscipline.data.staff_id,
                            learning_discipline_id: disciplinesCombo.getValue(),
                            date_start: (staffDisciplineDateStartField.getValue() == null) ? '' : staffDisciplineDateStartField.getValue(),
                            date_certification: (staffDisciplineDateCertificationField.getValue() == null) ? '' : staffDisciplineDateCertificationField.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (id == -1) ? 'Новая дисциплина' : 'Редактирование',
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    autoScroll: true,
                    height: 200,
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
                                    if (disciplinesCombo.getValue() == -1) {
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