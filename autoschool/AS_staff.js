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

    if (checkUserRole('STAFF_R')) {
        //variables	
        var selectedStaffId = -1;

        //stores

        var staffStore = Ext.create('Ext.data.Store', {
            model: 'StaffModel',
            remoteSort: true,
            pageSize: 20,
            proxy: {
                type: 'jsonp',
                url: 'AS_staff_list.php',
                extraParams: {start_id: 0, active_only: 0, id: 0},
                reader: {
                    root: 'list',
                    totalProperty: 'total'
                },
                simpleSortMode: true
            },
            sorters: [{
                    property: 'full_name',
                    direction: 'ASC'
                }]
        });
        staffStore.getProxy().extraParams = {start_id: 0, active_only: 0};
        staffStore.load();


        //grids

        var staffGrid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            store: staffStore,
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'post_name',
                    text: 'должность',
                    width: 250,
                    sortable: true
                }, {
                    dataIndex: 'full_name',
                    text: 'ФИО',
                    width: 250,
                    sortable: true
                }, {
                    dataIndex: 'comment',
                    text: 'примечания',
                    width: 500,
                    sortable: false
                }],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: staffStore,
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
                        selectedStaffId = record.data.id;
                        if (checkUserRole('STAFF_E')) {
                            editStaff(record.data.id, 0, function (id) {
                                staffStore.reload();
                            })
                        }

                    }

                },
                itemclick: function (view, record) {
                    if (record) {
                        selectedStaffId = record.data.id;

                    }
                }
            }
        });






        //panels


        var editStaffPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            bodyCls: 'alt-background',
            items: [{
                    xtype: 'button',
                    text: 'Новый сотрудник',
                    disabled: !checkUserRole('STAFF_A'),
                    margin: '5 5 5 5',
                    listeners: {
                        click: function () {
                            addStaff(
								function (id) {
									editStaff(id, 1,
										function () {
											staffStore.reload();
										})
								}
                            )

                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить сотрудника',
                    disabled: !checkUserRole('STAFF_D'),
                    margin: '5 5 5 5',
                    listeners: {
                        click: function () {
                            deleteStaff(selectedStaffId, function () {
                                staffStore.reload();
                            })

                        }
                    }
                }
            ]
        });


        var staffListPanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'alt-background',
            region: 'center',
            layout: 'border',
            items: [
                editStaffPanel,
                staffGrid
            ]
        });



        var panelS = Ext.create('Ext.panel.Panel', {
            region: 'north',
            bodyCls: 'alt-background',
            items: [{
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Инструкторско-преподавательский состав (ИПС)&nbsp;</span>'
                }

            ]
        });

        function addStaff(callback) {
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
                    url: 'AS_staff_edit.php',
                    success: done,
                    failure: fail,
                    params: {
                        id: -1,
                        firstname: '',
                        middlename: '',
                        lastname: '',
                        post: '',
                        birthdate: '',
                        birthplace: '',
                        gender_id: '1',
                        addr_index: '',
                        addr_region: -1,
                        addr_district: -1,
                        addr_city: '',
                        addr_street: '',
                        addr_house: '',
                        addr_build: '',
                        addr_flat: '',
                        education_id: -1,
                        comment: '',
                        inn: '',
                        snils: '',
                        phone_work: '',
                        phone_home: '',
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
                panelS,
                staffListPanel
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
