Ext.define('DictLDiscResults', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        'name',
        'learning_discipline_type',
        'learning_discipline_type_name',
        'dict_name',
        'value_label'
    ],
    idProperty: 'id'
});

var dictLDiscStore = Ext.create('Ext.data.Store', {
    model: 'DictLDiscResults',
    remoteSort: true,
    pageSize: 40,
    sorters: [{
            property: 'name',
            direction: 'ASC'
        }],
    proxy: {
        type: 'jsonp',
        url: 'AS_dict_ldisc_list.php',
        extraParams: {start_id: 0},
        simpleSortMode: true,
        reader: {
            root: 'list',
            totalProperty: 'total'
        },
        pageSize: 40
    }
});

var dictLDiscGrid = Ext.create('Ext.grid.Panel', {
    region: 'center',
    store: dictLDiscStore,
    disableSelection: false,
    hidden: true,
    columns: [{
            text: "тип",
            dataIndex: 'learning_discipline_type_name',
            flex: 2,
            sortable: true
        }, {
            text: "дисциплина",
            dataIndex: 'name',
            flex: 2,
            sortable: true
        }],
    bbar: Ext.create('Ext.PagingToolbar', {
        store: dictLDiscStore,
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
                createLDiscEditWindow(record.data.id, record.data.name, record.data.learning_discipline_type,
                        function (id) {
                            dictLDiscStore.reload();
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