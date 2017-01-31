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

    if (checkUserRole('D_R')) {
    var panelN = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        bodyCls: 'alt-background',
        items: [menuPanel]
    });
	
	
        var editDictPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                menuPanel,
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Редактирование справочников&nbsp;</span>'
                },
                dictsListCombo,
                {
                    xtype: 'button',
                    text: 'Новое значение',
                    margin: '10 10 10 10',
                    listeners: {
                        click: function () {
                            var dict_name = dictsListCombo.getValue().substr(0, dictsListCombo.getValue().indexOf('#'));
                            var value_label = dictsListCombo.getValue().substr(dictsListCombo.getValue().indexOf('#') + 1);
                            switch (dict_name) {
                                case 'vehicle_models':
                                    createVModelEditWindow(-1, '', -1,
                                            function (id) {
                                                dictVModelsStore.reload();
                                            });
                                    break;
                                case 'learning_disciplines':
                                    createLDiscEditWindow(-1, '', '0',
                                            function (id) {
                                                dictLDiscStore.reload();
                                            });
                                    break;
                                case 'school_units':
                                    createSchoolUnitEditWindow(-1, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', -1, 'false',
                                            function (id) {
                                                schoolUnitsStore.reload();
                                            });
                                    break;
                                default:
                                    createDictEditWindow(-1, '', dict_name, value_label,
                                            function (id) {
                                                loadDictionary(dict_name, 0);
                                            });
                                    break;
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить значение',
                    margin: '10 10 10 10',
                    listeners: {
                        click: function () {
                            if (selectedId != -2) {
                                switch (selectedDict) {
                                    case 'school_units':
                                        deleteSchoolUnit(selectedId, selectedName,
                                                function () {
                                                    schoolUnitsStore.reload();
                                                    selectedId = -2;
                                                    selectedName = '';
                                                    selectedDict = '';
                                                    selectedValueLabel = '';
                                                }
                                        );
                                        break;
                                    default:
                                        createDictDeleteWindow(selectedId, selectedName, selectedDict, selectedValueLabel,
                                                function () {
                                                    switch (selectedDict) {
                                                        case 'vehicle_models':
                                                            dictVModelsStore.reload();
                                                            break;
                                                        case 'learning_disciplines':
                                                            dictLDiscStore.reload();
                                                            break;
                                                        default:
                                                            loadDictionary(selectedDict, 0);
                                                            break;
                                                    }
                                                    selectedId = -2;
                                                    selectedName = '';
                                                    selectedDict = '';
                                                    selectedValueLabel = '';
                                                });
                                }
                            }
                        }
                    }
                }
            ]
        });


        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                Ext.create('Ext.form.Panel', {
                    autoScroll: true,
                    region: 'west',
                    bodyCls: 'alt-background',
                    border: false,
                    frame: false,
                    width: 1000,
                    bodyPadding: 5,
                    items: [
                        editDictPanel,
                        dictGrid,
                        dictVModelsGrid,
                        dictLDiscGrid,
                        schoolUnitsGrid
                    ]
                })
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
                menuPanel,
                noPrivilegesPanel
            ]
        });
    }
});
