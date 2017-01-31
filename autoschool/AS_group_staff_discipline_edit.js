function editGroupStaffDiscipline(id, is_new, callback) {
//*********variables**********

//**********stores**********
    var staffDisciplinesStore = Ext.create('Ext.data.Store', {
        model: 'GroupStaffDisciplinesModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_group_staff_disciplines_list.php',
            extraParams: {id: -1},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
        },
        pageSize: 1000000000
    });

    staffDisciplinesStore.getProxy().extraParams = {id:id};
    staffDisciplinesStore.load({
        callback: function (records, operation, success) {
            var staffDiscipline = staffDisciplinesStore.getById(id);
            if (staffDiscipline) {

                var disciplinesStore = Ext.create('Ext.data.Store', {
                    model: 'LDisciplinesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_ldisciplines_list.php',
                        extraParams: {start_id: -1, parent_id: 1},
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
				
				var staffStore = Ext.create('Ext.data.Store', {
                    model: 'StaffModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_list.php',
                        extraParams: {start_id: -1, active_only: 1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            staffCombo.setValue(staffDiscipline.data.staff_id);
                        }
                    }
                });


                staffStore.getProxy().extraParams = {start_id: -1, discipline_id: staffDiscipline.data.learning_discipline_id, active_only: 1};
                staffStore.load();
				
				disciplinesStore.getProxy().extraParams = {start_id: -1, parent_id: 1};
                disciplinesStore.load();

                var disciplinesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Дисциплина',
                    store: disciplinesStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false,
					listeners: {
						select: function (combo, records, eOpts) {
							staffCombo.setValue(-1);
							staffStore.getProxy().extraParams = {start_id: -1, discipline_id: disciplinesCombo.getValue(), active_only: 1};
							staffStore.load({
								callback: function(records, operation, success){
									staffCombo.setValue(-1);
								}
							});
						}
					}
                });
				
				var staffCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Преподаватель',
                    store: staffStore,
                    queryMode: 'local',
                    displayField: 'initials_name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
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
						staffCombo
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
                            url: 'AS_group_staff_discipline_delete.php',
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
                        url: 'AS_group_staff_discipline_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
							group_id: staffDiscipline.data.learning_group_id,
                            staff_id: staffCombo.getValue(),
                            discipline_id: disciplinesCombo.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новая дисциплина' : 'Редактирование',
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    autoScroll: true,
                    height: 150,
                    width: 500,
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
									if (staffCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбран преподаватель');
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