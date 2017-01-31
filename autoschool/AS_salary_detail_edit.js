function editSalaryDetailIn(id, is_new, callback) {
//*********variables**********

//**********stores**********
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

                var articlesStore = Ext.create('Ext.data.Store', {
                    model: 'ArticlesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_articles_list.php',
                        extraParams: {start_id: 0, mode: -1, type: -1, without_student_payments: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            articlesCombo.setValue(salaryDetailsIn.data.article_id);
                        }
                    }
                });
				
				articlesStore.getProxy().extraParams = {type: -1, mode: -1, without_student_payments: -1, start_id: -1};
                articlesStore.load();

				var lProgramsStore = Ext.create('Ext.data.Store', {
                    model: 'LProgramsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_lprograms_list.php',
                        extraParams: {start_id: -1, active_only: 0},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            lProgramsCombo.setValue(salaryDetailsIn.data.learning_program_id);
                        }
                    }
                });

                lProgramsStore.getProxy().extraParams = {start_id: -1, active_only: 0};
                lProgramsStore.load();
				
                var articlesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'статья',
                    store: articlesStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
                });
				
				 var lProgramsCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'программа',
                    store: lProgramsStore,
                    queryMode: 'local',
                    displayField: 'name_full',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
                });

                var valueField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'ставка',
                    allowBlank: true,
                    allowDecimal: true,
                    margin: '5 5 5 5',
                    value: salaryDetailsIn.data.value
                });

                var amountField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'кол-во',
                    allowBlank: true,
                    allowDecimal: false,
                    margin: '5 5 5 5',
                    value: salaryDetailsIn.data.amount
                });

                var coefficientField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'коэфф.',
                    allowBlank: true,
                    allowDecimal: true,
                    margin: '5 5 5 5',
                    value: salaryDetailsIn.data.coefficient
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
                        articlesCombo,
                        valueField,
                        amountField,
                        coefficientField,
						lProgramsCombo
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
                            url: 'AS_salary_detail_delete.php',
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
                        url: 'AS_salary_detail_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
							salary_month: salaryDetailsIn.data.salary_month,
							salary_year: salaryDetailsIn.data.salary_year,
							staff_id: salaryDetailsIn.data.staff_id,
                            article_id_in: articlesCombo.getValue(),
                            article_id_out: -1,
                            value: valueField.getValue(),
                            amount: amountField.getValue(),
                            coefficient: coefficientField.getValue(),
							learning_program_id: lProgramsCombo.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новая статья' : 'Редактирование',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    autoScroll: true,
                    height: 250,
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
                                    if (articlesCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбрана статья');
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

function editSalaryDetailOut(id, is_new, callback) {
//*********variables**********

//**********stores**********
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

                var articlesStore = Ext.create('Ext.data.Store', {
                    model: 'ArticlesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_articles_list.php',
                        extraParams: {start_id: 0, mode: -1, type: -1, without_student_payments: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            articlesCombo.setValue(salaryDetailsOut.data.article_id);
                        }
                    }
                });
				
				articlesStore.getProxy().extraParams = {type: -1, mode: -1, without_student_payments: -1, start_id: -1};
                articlesStore.load();
				
                var articlesCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'статья',
                    store: articlesStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    matchFieldWidth: false,
                    listConfig: {
                        width: 500
                    },
                    editable: false
                });

                var valueField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'ставка',
                    allowBlank: true,
                    allowDecimal: true,
                    margin: '5 5 5 5',
                    value: salaryDetailsOut.data.value
                });

                var amountField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'кол-во',
                    allowBlank: true,
                    allowDecimal: false,
                    margin: '5 5 5 5',
                    value: salaryDetailsOut.data.amount
                });

                var coefficientField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'коэфф.',
                    allowBlank: true,
                    allowDecimal: true,
                    margin: '5 5 5 5',
                    value: salaryDetailsOut.data.coefficient
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
                        articlesCombo,
                        valueField,
                        amountField,
                        coefficientField
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
                            url: 'AS_salary_detail_delete.php',
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
                        url: 'AS_salary_detail_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
							salary_month: salaryDetailsOut.data.salary_month,
							salary_year: salaryDetailsOut.data.salary_year,
							staff_id: salaryDetailsOut.data.staff_id,
                            article_id_in: -1,
                            article_id_out: articlesCombo.getValue(),
                            value: valueField.getValue(),
                            amount: amountField.getValue(),
                            coefficient: coefficientField.getValue(),
							learning_program_id: -1,
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новая статья' : 'Редактирование',
                    layout: 'fit',
                    resizable: true,
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
                                    if (articlesCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'не выбрана статья');
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