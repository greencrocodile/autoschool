Ext.define('SchoolUnitsResults', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        'name_short',
        'name_full',
        'addr_index',
        'addr_region',
        'addr_district',
        'addr_city',
        'addr_street',
        'addr_house',
        'addr_build',
        'addr_flat',
        'inn',
        'rs',
        'bank_name',
        'ks',
        'bik',
        'license_serial',
        'license_number',
        'license_giver',
        {name: 'license_date_start', type: 'date'},
        {name: 'license_date_end', type: 'date'},
        'reg_number',
        'reg_date',
        'gibdd_license_number',
        {name: 'gibdd_license_date_start', type: 'date'},
        {name: 'gibdd_license_date_end', type: 'date'},
        'rent_contract_number',
        {name: 'rent_contract_date_start', type: 'date'},
        {name: 'rent_contract_date_end', type: 'date'},
        'ground_rent_contract_number',
        {name: 'ground_rent_contract_date_start', type: 'date'},
        {name: 'ground_rent_contract_date_end', type: 'date'},
        {name: 'head_id', type: 'int'},
        'head_name',
        {name: 'is_main', type: 'int'},
        'is_main_text',
        'active'
    ],
    idProperty: 'id'
});

var schoolUnitsStore = Ext.create('Ext.data.Store', {
    model: 'SchoolUnitsResults',
    remoteSort: true,
    pageSize: 10,
    sorters: [{
            property: 'name_full',
            direction: 'ASC'
        }],
    proxy: {
        type: 'jsonp',
        url: 'AS_school_units_list.php',
        extraParams: {start_id: 0, active_only: 1},
        simpleSortMode: true,
        reader: {
            root: 'list',
            totalProperty: 'total'
        },
        pageSize: 10
    }
    ,
    listeners: {
        'load': function () {
            selectedId = -2;
            selectedName = '';
        }
    }
});

var schoolUnitsGrid = Ext.create('Ext.grid.Panel', {
    region: 'center',
    store: schoolUnitsStore,
    disableSelection: false,
    rowLines: true,
    columnLines: true,
    columns: [{
            dataIndex: 'name_full',
            text: 'наименование',
            flex: 2,
            sortable: true
        }],
    bbar: Ext.create('Ext.PagingToolbar', {
        store: schoolUnitsStore,
        displayInfo: true,
        displayMsg: '{0} - {1} из {2}',
        emptyMsg: 'Список пуст'
    }),
    listeners: {
        itemdblclick: function (view, record) {
            if (record) {
                createSchoolUnitEditWindow(record.data.id,
                        record.data.name_short,
                        record.data.name_full,
                        record.data.addr_index,
                        record.data.addr_region,
                        record.data.addr_district,
                        record.data.addr_city,
                        record.data.addr_street,
                        record.data.addr_house,
                        record.data.addr_build,
                        record.data.addr_flat,
                        record.data.inn,
                        record.data.rs,
                        record.data.bank_name,
                        record.data.ks,
                        record.data.bik,
                        record.data.license_serial,
                        record.data.license_number,
                        record.data.license_giver,
                        record.data.license_date_start,
                        record.data.license_date_end,
                        record.data.reg_number,
                        record.data.reg_date,
                        record.data.gibdd_license_number,
                        record.data.gibdd_license_date_start,
                        record.data.gibdd_license_date_end,
                        record.data.rent_contract_number,
                        record.data.rent_contract_date_start,
                        record.data.rent_contract_date_end,
                        record.data.ground_rent_contract_number,
                        record.data.ground_rent_contract_date_start,
                        record.data.ground_rent_contract_date_end,
                        record.data.head_id,
                        record.data.is_main,
                        function (id) {
                            schoolUnitsStore.reload();
                        });
            }

        },
        itemclick: function (view, record) {
            if (record) {
                selectedId = record.data.id;
                selectedName = record.data.name_full;
                selectedDict = 'school_units';
            }
        }
    }
});

