
function editDocument(id, is_new, callback) {

    var documentsStore = Ext.create('Ext.data.Store', {
        model: 'DocumentsModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_documents_list.php',
            extraParams: {id: -1},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });

    documentsStore.getProxy().extraParams = {id: id};
    documentsStore.load({
        callback: function (records, operation, success) {

            var doc = documentsStore.getById(id);
            if (doc){

                var documentTypesStore = Ext.create('Ext.data.Store', {
                    model: 'DocumentTypesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_document_types_list.php',
                        extraParams: {start_id: -1, parent_id: -1},
                        reader: {
                            type: 'json',
                            root: 'list'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            typeCombo.setValue(doc.data.document_type_id);
                        }
                    }
                });
                documentTypesStore.load();

                var typeCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Тип документа',
                    store: documentTypesStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '5 5 5 5',
                    pageSize: 10000,
                    editable: false,
                    width: 400
                });

                var serialField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'серия',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: (id == -1) ? '' : doc.data.serial
                });

                var numberField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'номер',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: (id == -1) ? '' : doc.data.number
                });

                var givenByField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'кем выдан',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    value: (id == -1) ? '' : doc.data.given_by
                });

                var codeField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'код',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    anchor: '100%',
                    value: (id == -1) ? '' : doc.data.code
                });

                var categoryField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'категория',
                    allowBlank: true,
                    margin: '5 5 5 5',
                    anchor: '100%',
                    value: (id == -1) ? '' : doc.data.category
                });

                var commentField = Ext.create('Ext.form.field.TextArea', {
                    value: (id == -1) ? '' : doc.data.comment,
                    maxLength: 1000,
                    margin: '5 5 5 5',
                    anchor: '100%'
                });

                var dateStartField = Ext.create('Ext.form.field.Date', {
                    fieldLabel: 'дата выдачи',
                    format: 'd.m.Y',
                    margin: '5 5 5 5',
                    value: (id == -1) ? '' : doc.data.date_start
                });

                var dateEndField = Ext.create('Ext.form.field.Date', {
                    fieldLabel: 'срок действия',
                    format: 'd.m.Y',
                    margin: '5 5 5 5',
                    value: (id == -1) ? '' : doc.data.date_end
                });



                var formPanel = Ext.create('Ext.form.Panel', {
                    frame: false,
                    bodyPadding: 5,
                    bodyCls: 'alt-background',
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 100,
                    },
                    items: [
                        typeCombo,
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                serialField,
                                numberField
                            ]
                        },
                        givenByField,
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                dateStartField,
                                dateEndField
                            ]
                        },
                        codeField,
                        categoryField,
                        {
                            xtype: 'fieldset',
                            title: 'Особые отметки',
                            items: [commentField]
                        }
                    ]
                });
				
				function delNew(callback) {
                    function done(result, request) {
                        if (result.responseText == 'ok') {
                            if (callback) {
                                callback()
                            }
                        }
                    }

                    if (is_new == 1) {
                        Ext.Ajax.request({
                            url: 'AS_document_delete.php',
                            success: done,
                            params: {
                                id: id,
                                user_id: sessvars.userId
                            }
                        });
                    }
                }

                function save() {

                    function fail(result, request) {
                        formPanel.body.unmask();
                        Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
						delNew();
                        is_new = 0;
                    }
                    
                    function done(result, request) {
                        formPanel.body.unmask();
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback(parseInt(result.responseText.substr(3)))
                            }
							is_new = 0;
                            win.close();
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                            return;
                        }
                    }
                    formPanel.body.mask('Сохранение...');
                    Ext.Ajax.request({
                        url: 'AS_document_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            type_id: typeCombo.getValue(),
                            serial: serialField.getValue(),
                            number: numberField.getValue(),
                            given_by: givenByField.getValue(),
                            date_start: (dateStartField.getValue() == null) ? '' : dateStartField.getValue(),
                            date_end: (dateEndField.getValue() == null) ? '' : dateEndField.getValue(),
                            code: codeField.getValue(),
                            category: categoryField.getValue(),
                            comment: commentField.getValue(),
                            vehicle_id: doc.data.vehicle_id,
                            student_operation_id: doc.data.student_operation_id,
                            given_student_operation_id: doc.data.given_student_operation_id,
                            staff_id: doc.data.staff_id,
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новый документ' : 'Редактирование документа',
                    layout: 'fit',
                    resizable: false,
                    modal: true,
                    autoScroll: true,
                    height: 400,
                    width: 600,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
                            text: 'ОК',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
                                    if (typeCombo.getValue() == -1) {
                                        Ext.Msg.alert('Ошибка', 'Не выбран тип документа');
                                        return;
                                    }
                                    save();
                                }
                            }
                        }, {
                            xtype: 'button',
                            text: 'Отмена',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
                                     delNew(function () {
                                        if (callback) {
                                            callback()
                                        }
                                    });
                                    win.close();
                                }
                            }
                        }
                    ],
                    listeners: {
                        'close': function (win) {
                            delNew();
                        }
                    }
                }).show();
            }
        }
    });
}			