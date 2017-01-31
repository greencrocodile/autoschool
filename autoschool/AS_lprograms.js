Ext.Loader.setPath('Ext.ux', 'ux');
Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.data.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.toolbar.*'
]);

Ext.onReady(function () {
    initDataModels();
    var panelN = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        bodyCls: 'alt-background',
        items: [menuPanel]
    });

    if (checkUserRole('LP_R')) {
        //**********variables**********
        var selectedLProgramId = -1;

        //**********models**********


        //**********stores**********
        var lProgramsStore = Ext.create('Ext.data.Store', {
            model: 'LProgramsModel',
            proxy: {
                type: 'jsonp',
                url: 'AS_lprograms_list.php',
                extraParams: {start_id: 0, active_only: 0, id: 0},
                simpleSortMode: true,
                reader: {
                    root: 'list',
                    totalProperty: 'total'
                }
            },
            remoteSort: true,
            pageSize: 20,
            sorters: [{
                    property: 'name_full',
                    direction: 'ASC'
                }]
        });
        lProgramsStore.getProxy().extraParams = {start_id: 0, active_only: 0};
        lProgramsStore.load();


        //**********grids**********
        var lProgramsGrid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            store: lProgramsStore,
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'name_full',
                    text: 'наименование программы',
                    width: 500,
                    sortable: true
                }, {
                    dataIndex: 'name_short',
                    text: 'аббр.',
                    width: 100,
                    sortable: true
                }, {
                    dataIndex: 'category',
                    text: 'кат.',
                    width: 50,
                    sortable: false
                }],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: lProgramsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            viewConfig: {
                getRowClass: function (record) {
                    if (record.get('active') == 0) {
                        return 'deleted-row';
                    }

                }
            },
            listeners: {
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedLProgramId = record.data.id;
                        if (checkUserRole('LP_E')) {
                            editLProgram(record.data.id, 0, function (id) {
                                lProgramsStore.reload();
                            })
                        }
                    }

                },
                itemclick: function (view, record) {
                    if (record) {
                        selectedLProgramId = record.data.id;
                    }
                }
            }
        });


        //**********panels**********
        var editLProgramPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            bodyCls: 'alt-background',
            border: false,
            items: [{
                    xtype: 'button',
                    text: 'Новая программа обучения',
                    disabled: !checkUserRole('LP_A'),
                    margin: '5 5 5 5',
                    listeners: {
                        click: function () {
                            addLProgram(
                                    function (id) {
                                        editLProgram(id, 1,
                                                function () {
                                                    lProgramsStore.reload();
                                                })
                                    }
                            )


                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить программу обучения',
                    margin: '5 5 5 5',
                    disabled: !checkUserRole('LP_D'),
                    listeners: {
                        click: function () {

                            deleteLProgram(selectedLProgramId, function () {
                                lProgramsStore.reload();
                            })
                        }
                    }
                }
            ]
        });




        var panelP = Ext.create('Ext.panel.Panel', {
            region: 'north',
            bodyCls: 'alt-background',
            border: false,
            items: [{
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Программы обучения&nbsp;</span>'
                }
            ]
        });

        var lProgramsListPanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'alt-background',
            region: 'center',
            layout: 'border',
            items: [
                editLProgramPanel,
                lProgramsGrid
            ]
        });



        //**********functions**********

        function addLProgram(callback) {
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
                    url: 'AS_lprogram_edit.php',
                    success: done,
                    failure: fail,
                    params: {
                        id: -1,
                        name_short: '',
                        name_full: '',
                        learning_program_type: -1,
                        category: '',
                        days: 0,
                        drive_lessons: 0,
                        drive_lessons_length: '',
                        drive_lessons_price: 0,
                        user_id: sessvars.userId
                    }
                });
            }

            save();

        }

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelP,
                lProgramsListPanel
            ]
        });
    } else {
        var noPrivilegesPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">У вас нет доступа к просмотру данных этой страницы</span>'
                }
            ]
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                noPrivilegesPanel
            ]
        });
    }
});
