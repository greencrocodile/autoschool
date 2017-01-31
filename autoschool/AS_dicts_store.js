Ext.define("DictsResults", {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'jsonp',
        url: 'AS_dicts_list.php',
        reader: {
            type: 'json',
            root: 'list'
        },
        pageSize: 0
    },
    fields: [
        {name: 'id', mapping: 'id'},
        {name: 'name', mapping: 'name'},
        {name: 'table_name', mapping: 'table_name'}
    ]
});

var dictsStore = Ext.create('Ext.data.Store', {
    model: 'DictsResults'
});

function loadDictionary(table_name, start_id) {
    dictStore.getProxy().extraParams = {dict_name: table_name, start_id: start_id};
    dictStore.load();
}
;
var dictsListCombo = Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Справочник',
    store: dictsStore,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'table_name',
    editable: false,
    width: 400,
    margin: '10 10 10 10',
    listeners: {
        change: function (view, record) {
            var dict_name = dictsListCombo.getValue().substr(0, dictsListCombo.getValue().indexOf('#'));
            switch (dict_name) {
                case 'vehicle_models':
                    dictGrid.hide();
                    dictLDiscGrid.hide();
                    schoolUnitsGrid.hide();
                    dictVModelsGrid.show();
                    dictVModelsStore.load();
                    break;
                case 'learning_disciplines':
                    dictGrid.hide();
                    dictVModelsGrid.hide();
                    schoolUnitsGrid.hide();
                    dictLDiscGrid.show();
                    dictLDiscStore.load();
                    break;
                case 'school_units':
                    dictGrid.hide();
                    dictVModelsGrid.hide();
                    dictLDiscGrid.hide();
                    schoolUnitsGrid.show();
                    schoolUnitsStore.load();
                    break;
                default:
                    dictVModelsGrid.hide();
                    dictLDiscGrid.hide();
                    schoolUnitsGrid.hide();
                    dictGrid.show();
                    loadDictionary(dict_name, 0);
                    break;
            }
        }
    }
});

Ext.define('DictResults', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        'name',
        'dict_name',
        'value_label'
    ],
    idProperty: 'id'
});

var dictStore = Ext.create('Ext.data.Store', {
    model: 'DictResults',
    remoteSort: true,
    pageSize: 40,
    sorters: [{
            property: 'name',
            direction: 'ASC'
        }],
    proxy: {
        type: 'jsonp',
        url: 'AS_dict_list.php',
        extraParams: {dict_name: '', start_id: 0},
        simpleSortMode: true,
        reader: {
            root: 'list',
            totalProperty: 'total'
        },
        pageSize: 40
    },
    listeners: {
        load: function () {
            selectedId = -2;
            selectedDict = '';
            selectedName = '';
            selectedValueLabel = '';
        }
    }
});

var dictGrid = Ext.create('Ext.grid.Panel', {
    region: 'center',
    store: dictStore,
    disableSelection: false,
    hidden: true,
    columns: [{
            dataIndex: 'name',
            flex: 2,
            sortable: true
        }],
    bbar: Ext.create('Ext.PagingToolbar', {
        store: dictStore,
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
                createDictEditWindow(record.data.id, record.data.name, record.data.dict_name, record.data.value_label,
                        function (id) {
                            loadDictionary(record.data.dict_name, 0);
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

