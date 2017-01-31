var selectedDocumentId = -2;
var selectedDocumentName = '';
var selectedDocumentVehicleId = -2;
var selectedDocumentStudentId = -2;
var selectedDocumentGivenStudentId = -2;
var selectedDocumentStaffId = -2;

Ext.define('DocumentsResults', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'vehicle_id', type: 'int'},
        {name: 'staff_id', type: 'int'},
        {name: 'student_id', type: 'int'},
        {name: 'given_student_id', type: 'int'},
        {name: 'document_type_id', type: 'int'},
        'name',
        'serial',
        'number',
        {name: 'date_start', type: 'date'},
        'given_by',
        'code',
        {name: 'date_end', type: 'date'},
        'category',
        'comment'
    ],
    idProperty: 'id'
});

var documentsStore = Ext.create('Ext.data.Store', {
    model: 'DocumentsResults',
    remoteSort: true,
    pageSize: 5,
    sorters: [{
            property: 'name',
            direction: 'ASC'
        }],
    proxy: {
        type: 'jsonp',
        url: 'AS_documents_list.php',
        simpleSortMode: true,
        extraParams: {vehicle_id: 0, student_id: -1, given_student_id: -1, staff_id: -1},
        reader: {
            root: 'list',
            totalProperty: 'total'
        },
        pageSize: 5
    },
    listeners: {
        'load': function () {
            selectedDocumentId = -2;
            selectedDocumentName = '';
        }
    }
});

function documentsStoreLoad(document_id, vehicle_id, student_id, given_student_id, staff_id) {
    selectedDocumentVehicleId = vehicle_id;
    selectedDocumentStudentId = student_id;
    selectedDocumentGivenStudentId = given_student_id;
    selectedDocumentStaffId = staff_id;
    documentsStore.getProxy().extraParams = {vehicle_id: vehicle_id, student_id: student_id, given_student_id: given_student_id, staff_id: staff_id};
    documentsStore.load();
}

var documentsGrid = Ext.create('Ext.grid.Panel', {
    region: 'center',
    rowLines: true,
    columnLines: true,
    store: documentsStore,
    disableSelection: false,
    columns: [{
            dataIndex: 'name',
            text: 'Название',
            flex: 2,
            sortable: true
        }, {
            dataIndex: 'serial',
            text: 'серия',
            flex: 2,
            sortable: false
        }, {
            dataIndex: 'number',
            text: 'номер',
            flex: 2,
            sortable: false
        }, {
            dataIndex: 'date_start',
            text: 'выдан',
            renderer: Ext.util.Format.dateRenderer('d.m.Y'), // H:i:s'),
            flex: 2,
            sortable: false
        }, {
            dataIndex: 'given_by',
            text: 'кем выдан',
            flex: 2,
            sortable: false
        }, {
            dataIndex: 'code',
            text: 'код',
            flex: 2,
            sortable: false
        }, {
            dataIndex: 'date_end',
            text: 'срок действия',
            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
            flex: 2,
            sortable: false
        }, {
            dataIndex: 'category',
            text: 'категория',
            flex: 2,
            sortable: false
        }, {
            dataIndex: 'comment',
            text: 'особые отметки',
            flex: 2,
            sortable: false
        }
    ],
    bbar: Ext.create('Ext.PagingToolbar', {
        store: documentsStore,
        displayInfo: true,
        displayMsg: '{0} - {1} из {2}',
        emptyMsg: 'Список пуст'
    }),
    listeners: {
        itemdblclick: function (view, record) {
            if (record) {
                createDocumentEditWindow(record.data.id, record.data.document_type_id, record.data.serial, record.data.number, record.data.given_by, record.data.code, record.data.category, record.data.comment, record.data.date_start, record.data.date_end, record.data.vehicle_id, -1, -1, -1,
                        function (id) {
                            documentsStoreLoad(id, selectedDocumentVehicleId, selectedDocumentStudentId, selectedDocumentGivenStudentId, selectedDocumentStaffId);
                        });
            }
        },
        itemclick: function (view, record) {
            selectedDocumentId = record.data.id;
            selectedDocumentName = record.data.name;
        }
    }
});

