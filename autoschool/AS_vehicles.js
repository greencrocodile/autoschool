
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

    if (checkUserRole('VEHICLES_R')) {
        //**********variables**********
        var selectedVehicleId = -1;

        //**********stores**********
        var vehiclesStore = Ext.create('Ext.data.Store', {
            model: 'VehiclesModel',
            proxy: {
                type: 'jsonp',
                url: 'AS_vehicles_list.php',
                extraParams: {start_id: 0, active_only: 0},
                reader: {
                    root: 'list',
                    totalProperty: 'total'
                },
                simpleSortMode: true
            },
            remoteSort: true,
            pageSize: 20,
            sorters: [{
                    property: 'model_name',
                    direction: 'ASC'
                }],
            listeners: {
                'load': function () {
                    selectedVehicleId = -1;
                }
            }
        });
        vehiclesStore.load();

        //**********grids**********
        var vehiclesGrid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            store: vehiclesStore,
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'model_name',
                    text: 'модель',
                    width: 200,
                    sortable: true
                }, {
                    dataIndex: 'reg_number',
                    text: 'рег. номер',
                    width: 200,
                    sortable: true
                }, {
                    dataIndex: 'color_name',
                    text: 'цвет',
                    width: 200,
                    sortable: true
                }],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: vehiclesStore,
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
                        selectedVehicleId = record.data.id;
                        if (checkUserRole('VEHICLES_E')) {
                            editVehicle(record.data.id, 0,
                                    function (id) {
                                        vehiclesStore.reload();
                                    }
                            )
                        }

                    }

                },
                itemclick: function (view, record) {
                    if (record) {
                        selectedVehicleId = record.data.id;
                    }
                }
            }
        });

        //**********panels**********


        var editVehiclePanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            bodyCls: 'alt-background',
            border: false,
            items: [{
                    xtype: 'button',
                    text: 'Новое транспортное средство',
                    margin: '5 5 5 0',
                    disabled: !checkUserRole('VEHICLES_A'),
                    listeners: {
                        click: function () {
                            addVehicle(
                                    function (id) {
                                        editVehicle(id, 1,
                                                function () {
                                                    vehiclesStore.reload();
                                                })
                                    }
                            )
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить транспортное средство',
                    margin: '5 5 5 0',
                    disabled: !checkUserRole('VEHICLES_D'),
                    listeners: {
                        click: function () {
                            deleteVehicle(selectedVehicleId, function () {
                                vehiclesStore.reload();
                            })
                        }
                    }
                }
            ]
        });

        var panelV = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [{
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Транспортные средства&nbsp;</span>'
                }
            ]
        });

        var vehiclesListPanel = Ext.create('Ext.panel.Panel', {
            bodyCls: 'alt-background',
            region: 'center',
            layout: 'border',
            items: [
                editVehiclePanel,
                vehiclesGrid
            ]
        });

        //**********functions**********

        function addVehicle(callback) {
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
                    url: 'AS_vehicle_edit.php',
                    success: done,
                    failure: fail,
                    params: {
                        id: -1,
                        model: '',
                        reg_number: '',
                        year: 0,
                        vin: '',
                        color: '',
                        user_id: sessvars.userId
                    }
                });
            }

            save();

        }

        //**********viewport**********		

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelV,
                vehiclesListPanel
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
