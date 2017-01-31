Ext.define('DictVModelsResults', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        'name',
        {name: 'mark_id', type: 'int'},
        'mark_name',
        'dict_name',
        'value_label'
    ],
    idProperty: 'id'
});

var dictVModelsStore = Ext.create('Ext.data.Store', {
    model: 'DictVModelsResults',
    remoteSort: true,
    pageSize: 40,
    sorters: [{
            property: 'name',
            direction: 'ASC'
        }],
    proxy: {
        type: 'jsonp',
        url: 'AS_dict_vmodels_list.php',
        extraParams: {start_id: 0},
        simpleSortMode: true,
        reader: {
            root: 'list',
            totalProperty: 'total'
        },
        pageSize: 40
    }
});

var dictVModelsGrid = Ext.create('Ext.grid.Panel', {
    region: 'center',
    store: dictVModelsStore,
    disableSelection: false,
    hidden: true,
    columns: [{
            text: "марка",
            dataIndex: 'mark_name',
            flex: 2,
            sortable: true
        }, {
            text: "модель",
            dataIndex: 'name',
            flex: 2,
            sortable: true
        }],
    bbar: Ext.create('Ext.PagingToolbar', {
        store: dictVModelsStore,
        displayInfo: true,
        displayMsg: '{0} - {1} из {2}',
        emptyMsg: 'Список пуст'
    }),
    // viewConfig: {
    // getRowClass: function(record) { 
    // if (record.get('name') && (record.get('id')>0)) { return 'user-configured-row'; };
    // }
    // },
    listeners: {
        itemdblclick: function (view, record) {
            if (record) {
                createVModelEditWindow(record.data.id, record.data.name, record.data.mark_id,
                        function (id) {
                            dictVModelsStore.reload();
                        });
            }
        },
        itemclick: function (view, record) {
            if (record) {
                selectedId = record.data.id;
                selectedDict = record.data.dict_name;
                selectedName = record.data.name;
                selectedValueLabel = record.data.value_label;
            }
        }
    }
});		