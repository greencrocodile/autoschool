function editLProgram(id, is_new, callback) {
    //**********variables**********
    var selectedLearningDisciplineId = -1;
    var selectedLProgramPriceHistoryId = -1;
    var selectedLProgramPriceHistoryPaymentId = -1;
    //**********stores**********
    var lProgramsStore = Ext.create('Ext.data.Store', {
        model: 'LProgramsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_lprograms_list.php',
            extraParams: {id: 0},
            simpleSortMode: true,
            reader: {
                root: 'list',
                totalProperty: 'total'
            }
        },
        pageSize: 1000000000
    });

    lProgramsStore.getProxy().extraParams = {id: id};
    lProgramsStore.load({
        callback: function (records, operation, success) {
            var program = lProgramsStore.getById(id);
            if (program) {
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
                    remoteSort: true,
                    pageSize: 10,
                    sorters: [{
                            property: 'learning_discipline_name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            selectedLearningDisciplineId = -1;
                        }
                    }
                });

                lProgramDisciplinesStore.getProxy().extraParams = {learning_program_id: id};
                lProgramDisciplinesStore.load();

                var lProgramPriceHistoryStore = Ext.create('Ext.data.Store', {
                    model: 'LProgramPriceHistoryModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_lprogram_price_history_list.php',
                        extraParams: {learning_program_id: 0},
                        simpleSortMode: true,
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        }
                    },
                    remoteSort: true,
                    pageSize: 5,
                    sorters: [{
                            property: 'date_begin',
                            direction: 'desc'
                        }],
                    listeners: {
                        'load': function () {
                            selectedLProgramPriceHistoryId = -1;
                            loadProgramPriceHistoryPaymentsStore(-2);

                        }
                    }
                });

                var lProgramPriceHistoryPaymentsStore = Ext.create('Ext.data.Store', {
                    model: 'LProgramPriceHistoryPaymentsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_lprogram_price_history_payments_list.php',
                        extraParams: {history_id: 0},
                        simpleSortMode: true,
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        }
                    },
                    remoteSort: true,
                    pageSize: 10,
                    sorters: [{
                            property: 'name_full',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            selectedLProgramPriceHistoryPaymentId = -1;
                        }
                    }
                });

                lProgramPriceHistoryStore.getProxy().extraParams = {learning_program_id: id};
                lProgramPriceHistoryStore.load();

                //**********fields**********

                var nameShortField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Краткое наименование',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: program.data.name_short
                });

                var nameFullField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Полное наименование',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: program.data.name_full
                });

                var categoryField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Категория',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: program.data.category
                });

                var daysField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'Длительность курса (дней)',
                    minValue: 0,
                    allowBlank: true,
                    allowDecimal: false,
                    margin: '5 5 5 5',
                    value: program.data.days
                });

                var driveLessonsField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'Количество практических занятий',
                    minValue: 0,
                    allowBlank: true,
                    allowDecimal: false,
                    margin: '5 5 5 5',
                    value: program.data.drive_lessons
                });

                var driveLessonsPriceField = Ext.create('Ext.form.field.Number', {
                    fieldLabel: 'Ставка за практическое занятие',
                    minValue: 0,
                    allowBlank: true,
                    allowDecimal: true,
                    margin: '5 5 5 5',
                    value: program.data.drive_lessons_price
                });

                var driveLessonsLengthField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Длительность практического занятия',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: program.data.drive_lessons_length
                });

                var typeRG = Ext.create('Ext.form.RadioGroup', {
                    fieldLabel: 'Тип обучения',
                    columns: 1,
                    vertical: true,
                    margin: '5 5 5 5',
                    items: [
                        {boxLabel: 'группа', name: 'typeRG', id: 'typeRGGroupRB', inputValue: '0'},
                        {boxLabel: 'индивидуально', name: 'typeRG', id: 'typeRGIndividualRB', inputValue: '1'},
                    ]
                });

                if (program.data.learning_program_type == '0') {
                    Ext.getCmp('typeRGGroupRB').setValue(true);
                    Ext.getCmp('typeRGIndividualRB').setValue(false);
                }
                if (program.data.learning_program_type == '1') {
                    Ext.getCmp('typeRGGroupRB').setValue(false);
                    Ext.getCmp('typeRGIndividualRB').setValue(true);
                }
                //**********grids**********

                var lProgramDisciplinesGrid = Ext.create('Ext.grid.Panel', {
                    store: lProgramDisciplinesStore,
                    disableSelection: false,
                    rowLines: true,
                    columnLines: true,
                    columns: [{
                            dataIndex: 'learning_discipline_name',
                            text: 'дисциплина',
                            flex: 2,
                            sortable: false
                        }, {
                            dataIndex: 'hours',
                            text: 'часы',
                            width: 60,
                            sortable: false
                        }
                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: lProgramDisciplinesStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                selectedLearningDisciplineIdId = record.data.id;
                                if (checkUserRole('LP_E')) {
                                    editLProgramDiscipline(record.data.id, 0, function () {
                                        lProgramDisciplinesStore.reload();
                                    })
                                }
                            }

                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedLearningDisciplineIdId = record.data.id;
                            }
                        }
                    }
                });

                var lProgramPriceHistoryGrid = Ext.create('Ext.grid.Panel', {
                    region: 'center',
                    store: lProgramPriceHistoryStore,
                    disableSelection: false,
                    rowLines: true,
                    columnLines: true,
                    columns: [{
                            dataIndex: 'date_begin',
                            text: 'дата начала действия',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            flex: 2,
                            sortable: false
                        }, {
                            dataIndex: 'price',
                            text: 'стоимость',
                            width: 100,
                            sortable: false
                        }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: lProgramPriceHistoryStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemclick: function (view, record) {
                            if (record) {
                                selectedLProgramPriceHistoryId = record.data.id;
                                loadProgramPriceHistoryPaymentsStore(selectedLProgramPriceHistoryId);
                            }
                        },
                        itemdblclick: function (view, record) {
                            if (record) {
                                if (checkUserRole('LP_E')) {
                                    selectedLProgramPriceHistoryId = record.data.id;
                                    editLProgramPrice(record.data.id, 0, function () {
                                        lProgramPriceHistoryStore.reload();
                                    })
                                }
                            }
                        }
                    }
                });

                var lProgramPriceHistoryPaymentsGrid = Ext.create('Ext.grid.Panel', {
                    store: lProgramPriceHistoryPaymentsStore,
					region:'center',
                    disableSelection: false,
                    rowLines: true,
                    columnLines: true,
                    columns: [{
                            dataIndex: 'price_part_name',
                            text: 'вид платежа',
                            flex: 2,
                            sortable: false
                        }, {
                            dataIndex: 'value',
                            text: 'стоимость',
                            width: 100,
                            sortable: false
                        }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: lProgramPriceHistoryPaymentsStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemclick: function (view, record) {
                            selectedLProgramPriceHistoryPaymentId = record.data.id;
                        },
                        itemdblclick: function (view, record) {
                            if (checkUserRole('LP_E')) {
                                selectedLProgramPriceHistoryPaymentId = record.data.id;
                                editLProgramPricePayment(record.data.id, 0,
                                        function () {
                                            loadProgramPriceHistoryPaymentsStore(selectedLProgramPriceHistoryId);
                                        }
                                )
                            }
                        }
                    }
                });

                //**********panels**********

                var editLProgramPricePanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
					region: 'north',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            disabled: !checkUserRole('LP_E'),
                            margin: '5 5 5 5',
                            listeners: {
                                click: function () {
                                    addLProgramPrice(
                                            function (id) {
                                                editLProgramPrice(id, 1, function () {
                                                    lProgramPriceHistoryStore.reload();
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            margin: '5 5 5 5',
                            disabled: !checkUserRole('LP_E'),
                            listeners: {
                                click: function () {
                                    deleteLProgramPrice(selectedLProgramPriceHistoryId, function () {
                                        lProgramPriceHistoryStore.reload();
                                    })
                                }
                            }
                        }
                    ]
                });

                var editLProgramDisciplinePanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            disabled: !checkUserRole('LP_E'),
                            margin: '5 5 5 5',
                            listeners: {
                                click: function () {
                                    addLProgramDiscipline(
                                            function (id) {
                                                editLProgramDiscipline(id, 1, function () {
                                                    lProgramDisciplinesStore.reload();
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            margin: '5 5 5 5',
                            disabled: !checkUserRole('LP_E'),
                            listeners: {
                                click: function () {
                                    deleteLProgramDiscipline(selectedLearningDisciplineIdId, function () {
                                        lProgramDisciplinesStore.reload();
                                    })
                                }
                            }
                        }
                    ]
                });

                var editLProgramPaymentsPanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
					region: 'north',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            disabled: !checkUserRole('LP_E'),
                            margin: '5 5 5 5',
                            listeners: {
                                click: function () {
                                    addLProgramPricePayment(
                                            function (id) {
                                                editLProgramPricePayment(id, 1, function () {
                                                    loadProgramPriceHistoryPaymentsStore(selectedLProgramPriceHistoryId);
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            disabled: !checkUserRole('LP_E'),
                            margin: '5 5 5 5',
                            listeners: {
                                click: function () {
                                    deleteLProgramPricePayment(selectedLProgramPriceHistoryPaymentId, function () {
                                        loadProgramPriceHistoryPaymentsStore(selectedLProgramPriceHistoryId);
                                    })
                                }
                            }
                        }
                    ]
                });

                var lProgramsTabPanelLProgramTab = Ext.create('Ext.panel.Panel', {
                    id: 'lProgramsTabPanelLProgramTab',
                    title: 'данные',
					border: false,
                    bodyCls: 'alt-background',
                    layout: 'border',
                    items: [
                        Ext.create('Ext.form.Panel', {
                            bodyCls: 'alt-background',
                            border: false,
                            region: 'west',
                            width: 300,
                            items: [
                                nameShortField,
                                nameFullField,
                                typeRG,
                                categoryField,
                                daysField,
                                driveLessonsField,
                                driveLessonsLengthField,
                                driveLessonsPriceField
                            ]
                        }),
                        Ext.create('Ext.form.Panel', {
                            bodyCls: 'alt-background',
                            border: false,
                            region: 'west',
                            width: 500,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'дисциплины',
                                    items: [
                                        editLProgramDisciplinePanel,
                                        lProgramDisciplinesGrid
                                    ]
                                }
                            ]
                        })
                    ]
                });

                var lProgramsTabPanelPriceTab = Ext.create('Ext.panel.Panel', {
                    id: 'lProgramsTabPanelPriceTab',
                    title: 'стоимость',
					border: false,
                    bodyCls: 'alt-background',
                    layout: 'border',
                    items: [
						{
							xtype: 'fieldset',
							layout: 'border',
							region: 'west',
							width: 350,
							title: 'периоды изменения стоимости обучения',
							items: [
								editLProgramPricePanel,
								lProgramPriceHistoryGrid
							]
						}
						,
						{
							xtype: 'fieldset',
							layout: 'border',
							region: 'west',
							width: 500,
							title: 'стоимость обучения',
							items: [
								editLProgramPaymentsPanel,
								lProgramPriceHistoryPaymentsGrid
							]
						}
                    ]
                });

                var lProgramsTabPanel = Ext.create('Ext.tab.Panel', {
                    id: 'lProgramsTabPanel',
                    region: 'center',
                    border: false,
                    items: [
                        lProgramsTabPanelLProgramTab,
                        lProgramsTabPanelPriceTab
                    ]
                });

                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 5,
                    bodyCls: 'alt-background',
                    items: [
                        lProgramsTabPanel
                    ]
                });

                function addLProgramDiscipline(callback) {
                    function done(result, request) {
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback(parseInt(result.responseText.substr(3)))
                            }
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        }
                    }
                    function fail(result, request) {
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                    }

                    function save() {
                        Ext.Ajax.request({
                            url: 'AS_lprogram_discipline_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
                                program_id: program.data.id,
                                discipline_id: -1,
                                hours: 0,
                                user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }

                function addLProgramPrice(callback) {
                    function done(result, request) {
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback(parseInt(result.responseText.substr(3)))
                            }
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        }
                    }
                    function fail(result, request) {
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                    }

                    function save() {
                        Ext.Ajax.request({
                            url: 'AS_lprogram_price_history_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
                                learning_program_id: program.data.id,
                                change_date: '',
                                price: 0,
                                user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }

                function addLProgramPricePayment(callback) {
                    function done(result, request) {
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback(parseInt(result.responseText.substr(3)))
                            }
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                        }
                    }
                    function fail(result, request) {
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                    }

                    function save() {
                        Ext.Ajax.request({
                            url: 'AS_lprogram_price_history_payment_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
                                history_id: selectedLProgramPriceHistoryId,
                                payment_type_id: -1,
                                value: 0,
                                required: 0,
                                user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }



                function loadProgramPriceHistoryPaymentsStore(id) {
                    lProgramPriceHistoryPaymentsStore.getProxy().extraParams = {history_id: id};
                    lProgramPriceHistoryPaymentsStore.load();

                    if (id < 0) {
                        editLProgramPaymentsPanel.hide();
                        lProgramPriceHistoryPaymentsGrid.hide();
                    } else {
                        editLProgramPaymentsPanel.show();
                        lProgramPriceHistoryPaymentsGrid.show();
                    }
                }

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
                            url: 'AS_lprogram_delete.php',
                            success: done,
                            params: {
                                id: id,
                                hard_delete: 1,
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
                    ;
                    function done(result, request) {
                        formPanel.body.unmask();
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback()
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
                        url: 'AS_lprogram_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            name_short: nameShortField.getValue(),
                            name_full: nameFullField.getValue(),
                            learning_program_type: (Ext.getCmp('typeRGGroupRB').getValue()) ? '0' : '1',
                            category: categoryField.getValue(),
                            days: daysField.getValue(),
                            drive_lessons: driveLessonsField.getValue(),
                            drive_lessons_length: driveLessonsLengthField.getValue(),
                            drive_lessons_price: driveLessonsPriceField.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (id == -1) ? 'Новая программа' : 'Редактирование программы',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    autoScroll: true,
                    height: 500,
                    width: 1000,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
                            text: 'ОК',
							disabled: !checkUserRole('LP_E'),
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
                                    is_new = 0;
                                    save()
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
                        'close': function (win) {//close( panel, eOpts )
                            delNew();
                        }
                    }
                }).show();
            }
        }
    });



}			