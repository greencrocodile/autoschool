Ext.Loader.setPath('Ext.ux', 'ux');
Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.data.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.toolbar.*',
	'Ext.tree.*'
]);

Ext.onReady(function () {
	initDataModels();
    var panelN = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        bodyCls: 'alt-background',
        items: [menuPanel]
    });

    if (checkUserRole('U_R')) {

        //**********variables**********
        var selectedUserId = -1;
		var selectedDictRecordId = -1;
        //**********stores**********
        var dictsStore = Ext.create('Ext.data.Store', {
            model: 'DictionariesModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_dicts_list.php',
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
            remoteSort: true,
            pageSize: 1000000000
        });
		
		dictsStore.load();
		
        //**********grids**********
        var dictsGrid = Ext.create('Ext.grid.Panel', {
            store: dictsStore,
            region: 'center',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'name',
                    text: 'Справочник',
                    flex: 2,
                    sortable: true
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: dictsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
						selectedDictId = record.data.id;
						if (record.data.dict_type == 1){
							simpleDictStore.getProxy().extraParams = {table_name: record.data.table_name};
							simpleDictStore.load();
							simpleDictGrid.show();
							simpleTreeGrid.hide();
						}
						if (record.data.dict_type == 2){
							simpleTreeStore.getProxy().extraParams = {table_name: record.data.table_name};
							simpleTreeStore.load();
							simpleDictGrid.hide();
							simpleTreeGrid.show();
						} 
						if (record.data.dict_type == 3){
							simpleDictGrid.hide();
							simpleTreeGrid.hide();
						}

                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
						selectedDictId = record.data.id;
						if (record.data.dict_type == 1){
							simpleDictStore.getProxy().extraParams = {table_name: record.data.table_name};
							simpleDictStore.load();
							simpleDictGrid.show();
							simpleTreeGrid.hide();
						}
						if (record.data.dict_type == 2){
							simpleTreeStore.getProxy().extraParams = {table_name: record.data.table_name};
							simpleTreeStore.load();
							simpleDictGrid.hide();
							simpleTreeGrid.show();
						} 
						if (record.data.dict_type == 3){
							simpleDictGrid.hide();
							simpleTreeGrid.hide();
						}
                    }
                }
            }
        })

        //**********panels**********
        var panelU = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Справочники&nbsp;</span>'
                }
            ]
        });

        var dictsListPanel = Ext.create('Ext.panel.Panel', {
			region: 'west',
			width: 400,
            bodyCls: 'alt-background',
            id: 'usersListPanel',
			layout: 'border',
            items: [
                dictsGrid
            ]
        });

		var simpleTreeStore = Ext.create('Ext.data.TreeStore', {
			model: 'SimpleDictionaryModel',
			proxy: {
				type: 'ajax',
				url: 'AS_dict_tree_list.php'
			}
		});
		
		var simpleDictStore = Ext.create('Ext.data.Store', {
			model: 'SimpleDictionaryModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_dict_list.php',
				simpleSortMode: true,
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
            remoteSort: true,
			pageSize: 1000000000
		});
		
		var simpleTreeGrid = Ext.create('Ext.tree.Panel', {
			region: 'center',
			rootVisible: false,
			store: simpleTreeStore,
			hidden: true,
			columns: [{
				xtype: 'treecolumn', 
				text: 'Наименование',
				flex: 2,
				dataIndex: 'name',
				iconCls: ''
			}
			// ,{
				// text: 'id',
				// flex: 1,
				// sortable: true,
				// dataIndex: 'id',
				// align: 'center',
				// iconCls: ''
			// }
			],
			listeners: {
                itemdblclick: function (view, record) {
                    if (record) {
                        console.log(record.data.id+','+record.data.parent_id+','+record.data.name);
                    }
                }
			}
		});
		
		var simpleDictGrid = Ext.create('Ext.grid.Panel', {
            store: simpleDictStore,
            region: 'center',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
			hidden: true,
            columns: [{
                    dataIndex: 'name',
                    text: 'Наименование',
                    flex: 2
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: simpleDictStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
						selectedDictRecordId = record.data.id;
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
						console.log(record.data.id+','+record.data.name);
                    }
                }
            }
        })
        
		Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelU,
                dictsListPanel,
				simpleTreeGrid,
				simpleDictGrid
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
