function editStaff(id, is_new, callback) {
    //**********variables**********
    var selectedStaffDisciplineId = -1;
    var selectedStaffOperationInId = -1;
    var selectedStaffOperationOutId = -1;
    var selectedStaffSalaryArticleInId = -1;
    var selectedStaffSalaryArticleOutId = -1;
    var selectedDocumentId = -1;
    //**********stores**********
    var staffStore = Ext.create('Ext.data.Store', {
        model: 'StaffModel',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_list.php',
            extraParams: {id: 0},
            reader: {
                root: 'list',
                totalProperty: 'total'
            },
            simpleSortMode: true
        }
    });
    staffStore.getProxy().extraParams = {id: id};
    staffStore.load({
        callback: function (records, operation, success) {
            var staff = staffStore.getById(id);
            if (staff) {
                var staffDisciplinesStore = Ext.create('Ext.data.Store', {
                    model: 'StaffDisciplinesModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_disciplines_list.php',
                        extraParams: {staff_id: -1},
                        simpleSortMode: true,
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                    },
                    remoteSort: true,
                    pageSize: 10,
                    sorters: [{
                            property: 'full_name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            selectedStaffDisciplineId = -1;
                        }
                    }
                });

                staffDisciplinesStore.getProxy().extraParams = {staff_id: id};
                staffDisciplinesStore.load();

                var educationsStore = Ext.create('Ext.data.Store', {
                    model: 'EducationsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_educations_list.php',
                        extraParams: {start_id: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            educationsCombo.setValue(staff.data.education_id);
                        }
                    }
                });
                educationsStore.getProxy.extraParams = {start_id: -1};
                educationsStore.load();

                var staffOperationsInStore = Ext.create('Ext.data.Store', {
                    model: 'StaffOperationsInModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_operations_list.php',
                        extraParams: {staff_id: -2, in_article: 1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    remoteSort: true,
                    pageSize: 5,
                    listeners: {
                        'load': function () {
                            selectedStaffOperationInId = -1;
                        }
                    }
                });
				if(checkUserRole('STAFF_OPER_R')){
					staffOperationsInStore.getProxy().extraParams = {staff_id: id, in_article: 1};
					staffOperationsInStore.load();
				}

                var staffOperationsOutStore = Ext.create('Ext.data.Store', {
                    model: 'StaffOperationsOutModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_operations_list.php',
                        extraParams: {staff_id: -2, in_article: 0},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    remoteSort: true,
                    pageSize: 5,
                    listeners: {
                        'load': function () {
                            selectedStaffOperationOutId = -1;
                        }
                    }
                });
				if(checkUserRole('STAFF_OPER_R')){
					staffOperationsOutStore.getProxy().extraParams = {staff_id: id, in_article: 0};
					staffOperationsOutStore.load();
				}

                var staffSalaryArticlesInStore = Ext.create('Ext.data.Store', {
                    model: 'StaffSalaryArticlesInModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_salary_articles_list.php',
                        extraParams: {staff_id: -2, in_article: 1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    remoteSort: true,
                    pageSize: 5,
                    listeners: {
                        'load': function () {
                            selectedStaffSalaryArticleInId = -1;
                        }
                    }
                });
				if(checkUserRole('STAFF_OPER_R')){
					staffSalaryArticlesInStore.getProxy().extraParams = {staff_id: id, in_article: 1};
					staffSalaryArticlesInStore.load();
				}

                var staffSalaryArticlesOutStore = Ext.create('Ext.data.Store', {
                    model: 'StaffSalaryArticlesOutModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_staff_salary_articles_list.php',
                        extraParams: {staff_id: -2, in_article: 0},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    remoteSort: true,
                    pageSize: 5,
                    listeners: {
                        'load': function () {
                            selectedStaffSalaryArticleOutId = -1;
                        }
                    }
                });
				if(checkUserRole('STAFF_OPER_R')){
					staffSalaryArticlesOutStore.getProxy().extraParams = {staff_id: id, in_article: 0};
					staffSalaryArticlesOutStore.load();
				}

                var staffRegionsStore = Ext.create('Ext.data.Store', {
                    model: 'RegionsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_regions_list.php',
                        extraParams: {start_id: 0},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            addrRegionCombo.setValue(staff.data.addr_region);
                        }
                    }
                });
                staffRegionsStore.getProxy().extraParams = {start_id: -1};
                staffRegionsStore.load();

                var staffDistrictsStore = Ext.create('Ext.data.Store', {
                    model: 'DistrictsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_districts_list.php',
                        extraParams: {start_id: 0, region_id: 0},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
                            addrDistrictCombo.setValue(staff.data.addr_district);
                        }
                    }
                });
                staffDistrictsStore.getProxy().extraParams = {start_id: -1, region_id: staff.data.addr_region};
                staffDistrictsStore.load();

                var documentsStore = Ext.create('Ext.data.Store', {
                    model: 'DocumentsModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_documents_list.php',
                        extraParams: {vehicle_id: -1, student_operation_id: -1, given_student_operation_id: -1, staff_id: -1},
                        reader: {
                            root: 'list',
                            totalProperty: 'total'
                        },
                        simpleSortMode: true
                    },
                    remoteSort: true,
                    pageSize: 5,
                    sorters: [{
                            property: 'name',
                            direction: 'ASC'
                        }],
                    listeners: {
                        'load': function () {
                            selectedDocumentId = -1;
                        }
                    }
                });

                documentsStore.getProxy().extraParams = {vehicle_id: -1, student_id: -1, given_student_id: -1, staff_id: id};
                documentsStore.load();


                //**********fields**********

                var educationsCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Образование',
                    store: educationsStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    editable: false
                });

                var firstnameField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Имя',
                    allowBlank: false,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.firstname
                });

                var middlenameField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Отчество',
                    allowBlank: false,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.middlename
                });

                var lastnameField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Фамилия',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.lastname
                });

                var birthdateField = Ext.create('Ext.form.field.Date', {
                    fieldLabel: 'дата рождения',
                    format: 'd.m.Y',
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.birthdate
                });

                var birthplaceField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'место рождения',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.birthplace
                });

                var addrIndexField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Индекс',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.addr_index
                });

                var addrRegionCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Регион',
                    store: staffRegionsStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    editable: false,
					listeners: {
						select: function (combo, records, eOpts) {
							addrDistrictCombo.setValue(-1);
							staffDistrictsStore.getProxy().extraParams = {region_id: addrRegionCombo.getValue(),start_id: -1};
							staffDistrictsStore.load({
								callback: function(records, operation, success){
									addrDistrictCombo.setValue(-1);
								}
							});
						}
					}
                });

                var addrDistrictCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Район',
                    store: staffDistrictsStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    editable: false
                });

                var addrCityField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Населённый пункт',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.addr_city
                });

                var addrStreetField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Улица',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.addr_street
                });

                var addrHouseField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Дом',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.addr_house
                });

                var addrBuildField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Корпус',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.addr_build
                });

                var addrFlatField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Помещение',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.addr_flat
                });

                var commentField = Ext.create('Ext.form.field.TextArea', {
                    maxLength: 8000,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.comment,
                    anchor: '100%'
                });

                var postField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'Должность',
                    allowBlank: false,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.post_name
                });

                var genderRG = Ext.create('Ext.form.RadioGroup', {
                    fieldLabel: 'пол',
                    columns: 2,
                    vertical: true,
                    width: 300,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    items: [
                        {boxLabel: 'Ж', name: 'genderRG', id: 'genderRGF', inputValue: '0'},
                        {boxLabel: 'М', name: 'genderRG', id: 'genderRGM', inputValue: '1'},
                    ]
                });

                var innField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'ИНН',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.inn
                });

                var snilsField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'СНИЛС',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.snils
                });

                var phoneHomeField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'дом. тел.',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.phone_home
                });

                var phoneWorkField = Ext.create('Ext.form.field.Text', {
                    fieldLabel: 'раб. тел.',
                    allowBlank: true,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    value: staff.data.phone_work
                });

                if (staff.data.gender_id == '0') {
                    Ext.getCmp('genderRGF').setValue(true);
                    Ext.getCmp('genderRGM').setValue(false);
                }
                if (staff.data.gender_id == '1') {
                    Ext.getCmp('genderRGF').setValue(false);
                    Ext.getCmp('genderRGM').setValue(true);
                }
                //**********grids**********

                var staffDisciplinesGrid = Ext.create('Ext.grid.Panel', {
                    store: staffDisciplinesStore,
                    disableSelection: false,
					region: 'center',
                    rowLines: true,
                    columnLines: true,
                    columns: [{
                            dataIndex: 'learning_discipline_name',
                            text: 'дисциплина',
                            width: 300,
                            sortable: false
                        }, {
                            dataIndex: 'date_start',
                            text: 'дата начала преподавания',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            width: 100,
                            sortable: false
                        }, {
                            dataIndex: 'date_certification',
                            text: 'дата аттестации',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            width: 100,
                            sortable: false
                        }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: staffDisciplinesStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                if (checkUserRole('STAFF_E')) {
                                    selectedStaffDisciplineId = record.data.id;
                                    editStaffDiscipline(record.data.id, 0, function () {
                                        staffDisciplinesStore.reload();
                                    })
                                }
                            }

                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedStaffDisciplineId = record.data.id;
                            }
                        }
                    }
                });

                var staffSalaryArticlesInGrid = Ext.create('Ext.grid.Panel', {
                    store: staffSalaryArticlesInStore,
                    disableSelection: false,
					region: 'center',
                    rowLines: true,
                    columnLines: true,
                    columns: [{
                            dataIndex: 'article_name_in',
                            text: 'статья',
                            width: 300,
                            sortable: true
                        }, {
                            dataIndex: 'value',
                            text: 'ставка, руб.',
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'amount',
                            text: 'количество',
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'coefficient',
                            text: 'коэффициент',
                            width: 70,
                            sortable: true
                        }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: staffSalaryArticlesInStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                if (checkUserRole('STAFF_OPER_E')) {
                                    selectedStaffSalaryArticleInId = record.data.id;
                                    editStaffSalaryArticleIn(record.data.id, 0, function () {
                                        staffSalaryArticlesInStore.reload();
                                    })
                                }
                            }
                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedStaffSalaryArticleInId = record.data.id;
                            }
                        }
                    }
                });

                var staffSalaryArticlesOutGrid = Ext.create('Ext.grid.Panel', {
                    store: staffSalaryArticlesOutStore,
                    disableSelection: false,
					region: 'center',
                    rowLines: true,
                    columnLines: true,
                    columns: [{
                            dataIndex: 'article_name_out',
                            text: 'статья',
                            width: 300,
                            sortable: true
                        }, {
                            dataIndex: 'value',
                            text: 'стоимость за ед., руб.',
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'amount',
                            text: 'количество',
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'coefficient',
                            text: 'коэффициент',
                            width: 70,
                            sortable: true
                        }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: staffSalaryArticlesOutStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                if (checkUserRole('STAFF_OPER_E')) {
                                    selectedStaffSalaryArticleOutId = record.data.id;
                                    editStaffSalaryArticleOut(record.data.id, 0, function () {
                                        staffSalaryArticlesOutStore.reload();
                                    })
                                }
                            }

                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedStaffSalaryArticleOutId = record.data.id;
                            }
                        }
                    }
                });

                var staffOperationsInGrid = Ext.create('Ext.grid.Panel', {
                    store: staffOperationsInStore,
                    disableSelection: false,
					region: 'center',
                    rowLines: true,
                    columnLines: true,
                    columns: [
                        {
                            dataIndex: 'operation_date',
                            text: 'дата',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'article_name_in',
                            text: 'статья',
                            width: 300,
                            sortable: true
                        }, {
                            dataIndex: 'value',
                            text: 'сумма',
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'comment',
                            text: 'примечание',
                            width: 300,
                            sortable: true
                        }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: staffOperationsInStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                if (checkUserRole('STAFF_OPER_E')) {
                                    selectedStaffOperationInId = record.data.id;
                                    editStaffOperationIn(record.data.id, 0, function () {
                                        staffOperationsInStore.reload();
                                    })
                                }
                            }


                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedStaffOperationInId = record.data.id;
                            }
                        }
                    }
                });

                var staffOperationsOutGrid = Ext.create('Ext.grid.Panel', {
                    store: staffOperationsOutStore,
					region: 'center',
                    disableSelection: false,
                    rowLines: true,
                    columnLines: true,
                    columns: [
                        {
                            dataIndex: 'operation_date',
                            text: 'дата',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'article_name_out',
                            text: 'статья',
                            width: 300,
                            sortable: true
                        }, {
                            dataIndex: 'value',
                            text: 'сумма',
                            width: 70,
                            sortable: true
                        }, {
                            dataIndex: 'comment',
                            text: 'примечание',
                            width: 300,
                            sortable: true
                        }],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: staffOperationsOutStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                if (checkUserRole('STAFF_OPER_E')) {
                                    selectedStaffOperationOutId = record.data.id;
                                    editStaffOperationOut(record.data.id, 0, function () {
                                        staffOperationsOutStore.reload();
                                    })
                                }
                            }
                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedStaffOperationOutId = record.data.id;
                            }
                        }
                    }
                });


                var documentsGrid = Ext.create('Ext.grid.Panel', {
                    rowLines: true,
                    columnLines: true,
					region: 'center',
                    store: documentsStore,
                    disableSelection: false,
                    columns: [{
                            dataIndex: 'name',
                            text: 'Название',
                            width: 200,
                            sortable: true
                        }, {
                            dataIndex: 'serial',
                            text: 'серия',
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'number',
                            text: 'номер',
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'date_start',
                            text: 'выдан',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'), // H:i:s'),
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'given_by',
                            text: 'кем выдан',
                            width: 200,
                            sortable: false
                        }, {
                            dataIndex: 'code',
                            text: 'код',
                            width: 50,
                            sortable: false
                        }, {
                            dataIndex: 'date_end',
                            text: 'срок действия',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            width: 70,
                            sortable: false
                        }, {
                            dataIndex: 'category',
                            text: 'категория',
                            width: 50,
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
                                selectedDocumentId = record.data.id;
                                if (checkUserRole('STAFF_E')) {
                                    editDocument(selectedDocumentId, 0, function () {
										documentsStore.reload();
									})
                                }
                            }
                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedDocumentId = record.data.id;
                            }
                        }
                    }
                });
                //**********panels**********

                var editStaffDocumentPanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
                    border: false,
					region: 'north',
                    items: [{
                            xtype: 'button',
                            text: 'Новый документ',
                            disabled: !checkUserRole('STAFF_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
									addDocument(
										function (id) {
											editDocument(id, 1, function () {
												documentsStore.reload();
											})
										}									
									)
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить документ',
                            disabled: !checkUserRole('STAFF_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
                                    deleteDocument(selectedDocumentId, function () {
										documentsStore.reload();
									})
                                }
                            }
                        }
                    ]
                });

                var editSalaryArticlesInPanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
					region: 'north',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
                                    addStaffSalaryArticle(
                                            function (id) {
                                                editStaffSalaryArticleIn(id, 1, function () {
                                                    staffSalaryArticlesInStore.reload();
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            margin: '3 3 3 3',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            listeners: {
                                click: function () {
                                    deleteStaffSalaryArticleIn(selectedStaffSalaryArticleInId, function () {
                                        staffSalaryArticlesInStore.reload();
                                    })
                                }
                            }
                        }
                    ]
                });

                var editSalaryArticlesOutPanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
					region: 'north',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
                                    addStaffSalaryArticle(
                                            function (id) {
                                                editStaffSalaryArticleOut(id, 1, function () {
                                                    staffSalaryArticlesOutStore.reload();
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            margin: '3 3 3 3',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            listeners: {
                                click: function () {
                                    deleteStaffSalaryArticleOut(selectedStaffSalaryArticleOutId, function () {
                                        staffSalaryArticlesOutStore.reload();
                                    })
                                }
                            }
                        }
                    ]
                });

                var editOperationsInPanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
					region: 'north',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
                                    addStaffOperation(
                                            function (id) {
                                                editStaffOperationIn(id, 1, function () {
                                                    staffOperationsInStore.reload();
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            margin: '3 3 3 3',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            listeners: {
                                click: function () {
                                    deleteStaffOperationIn(selectedStaffOperationInId, function () {
                                        staffOperationsInStore.reload();
                                    })
                                }
                            }
                        }
                    ]
                });

                var editOperationsOutPanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
					region: 'north',
                    border: false,
                    items: [{
                            xtype: 'button',
                            text: 'Добавить',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
                                    addStaffOperation(
                                            function (id) {
                                                editStaffOperationOut(id, 1, function () {
                                                    staffOperationsOutStore.reload();
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            margin: '3 3 3 3',
                            disabled: !checkUserRole('STAFF_OPER_E'),
                            listeners: {
                                click: function () {
                                    deleteStaffOperationOut(selectedStaffOperationOutId, function () {
                                        staffOperationsOutStore.reload();
                                    })
                                }
                            }
                        }
                    ]
                });

                var editStaffDisciplinePanel = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
                    border: false,
					region: 'north',
                    items: [{
                            xtype: 'button',
                            text: 'Новая дисциплина',
                            disabled: !checkUserRole('STAFF_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
                                    addStaffDiscipline(
                                            function (id) {
                                                editStaffDiscipline(id, 1, function () {
                                                    staffDisciplinesStore.reload();
                                                })
                                            }
                                    )
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить дисциплину',
                            disabled: !checkUserRole('STAFF_E'),
                            margin: '3 3 3 3',
                            listeners: {
                                click: function () {
                                    deleteStaffDiscipline(selectedStaffDisciplineId, function () {
                                        staffDisciplinesStore.reload();
                                    })
                                }
                            }
                        }
                    ]
                });

                var staffTabPanelStaffTab = Ext.create('Ext.panel.Panel', {
                    border: false,
                    title: 'Основные данные',
                    bodyCls: 'alt-background',
                    id: 'staffTabPanelStaffTab',
                    layout: 'border',
                    items: [
                        Ext.create('Ext.form.Panel', {
                            border: false,
                            region: 'west',
                            width: 900,
                            bodyPadding: 5,
                            bodyCls: 'alt-background',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 120
                            },
                            items: [{
                                    xtype: 'fieldset',
                                    title: 'Основные реквизиты',
                                    items: [
                                        postField,
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                lastnameField,
                                                firstnameField,
                                                middlenameField
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                birthdateField,
                                                birthplaceField
                                            ]
                                        },
                                        genderRG
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Адрес',
                                    items: [
                                        addrIndexField,
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                addrRegionCombo,
                                                addrDistrictCombo
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                addrCityField,
                                                addrStreetField
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                addrHouseField,
                                                addrBuildField,
                                                addrFlatField
                                            ]
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                phoneHomeField,
                                                phoneWorkField
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Дополнительные реквизиты',
                                    items: [
 										{
											xtype: 'fieldcontainer',
											layout: 'hbox',
											items: [ 
												educationsCombo, 
												innField,
												snilsField,
											]
										},
										commentField
                                    ]
                                }
                            ]
                        })
                    ]
                });

                var staffTabPanelDiscDocTab = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
                    border: false,
                    id: 'staffTabPanelDiscDocTab',
					layout: 'border',
					title: 'Дисциплины, документы',
                    items: [
                        {
                            xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 240,
                            title: 'Документы',
                            items: [
                               	editStaffDocumentPanel,
                                documentsGrid
                            ]
                        },
                        {
                            xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 240,
                            title: 'Дисциплины',
                            items: [
                                editStaffDisciplinePanel,
                                staffDisciplinesGrid
                            ]
                        }
                    ]
                });

                var staffTabPanelSalaryTab = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
                    border: false,
					layout: 'border',
                    id: 'staffTabPanelSalaryTab',
                    title: 'Статьи зарплаты ИПС',
                    items: [
                        {
                            xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 240,
                            title: 'Начисления',
                            items: [
                                editSalaryArticlesInPanel,
                                staffSalaryArticlesInGrid
                            ]
                        },
                        {
                            xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 240,
                            title: 'Вычеты',
                            items: [
                                editSalaryArticlesOutPanel,
                                staffSalaryArticlesOutGrid
                            ]
                        }
                    ]
                });

                var staffTabPanelOperTab = Ext.create('Ext.panel.Panel', {
                    bodyCls: 'alt-background',
                    border: false,
					layout: 'border',					
                    id: 'staffTabPanelOperTab',
                    title: 'Операции с ИПС',
                    items: [
                        {
                            xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 240,
                            title: 'Начисления',
                            items: [
                                editOperationsInPanel,
                                staffOperationsInGrid
                            ]
                        },
                        {
                            xtype: 'fieldset',
							region: 'north',
							layout: 'border',
							height: 240,
                            title: 'Вычеты',
                            items: [
                                editOperationsOutPanel,
                                staffOperationsOutGrid
                            ]
                        }



                    ]
                });

                var staffTabPanel = Ext.create('Ext.tab.Panel', {
                    border: false,
                    id: 'staffTabPanel',
                    region: 'center',
                    items: [
                        staffTabPanelStaffTab,
                        staffTabPanelDiscDocTab,
                        staffTabPanelSalaryTab,
                        staffTabPanelOperTab
                    ]
                })

                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 5,
                    bodyCls: 'alt-background',
                    items: [
                        staffTabPanel
                    ]
                });
				
				function addDocument(callback) {
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
                            url: 'AS_document_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
								type_id: -1,
								serial: '',
								number: '',
								given_by: '',
								date_start: '',
								date_end: '',
								code: '',
								category: '',
								comment: '',
								vehicle_id: -1,
								student_operation_id: -1,
								given_student_operation_id: -1,
								staff_id: staff.data.id,
								user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }

                function addStaffDiscipline(callback) {
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
                            url: 'AS_staff_discipline_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
                                staff_id: id,
                                learning_discipline_id: -1,
                                date_start: '',
                                date_certification: '',
                                user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }

                function addStaffOperation(callback) {
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
                            url: 'AS_staff_operation_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
                                staff_id: id,
                                operation_date: '',
                                value: '',
                                article_id_in: -1,
                                article_id_out: -1,
                                comment: '',
                                user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }

                function addStaffSalaryArticle(callback) {
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
                            url: 'AS_staff_salary_article_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
                                staff_id: id,
                                value: '',
                                article_id_in: -1,
                                article_id_out: -1,
                                amount: 0,
                                coefficient: 1,
                                user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }

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
                            url: 'AS_staff_delete.php',
                            success: done,
                            params: {
                                id: id,
                                hard_delete: 1,
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
                    ;
                    function done(result, request) {
                        formPanel.body.unmask();
                        if (result.responseText.substr(0, 2) == 'ok') {
                            if (callback) {
                                callback()
                            }
                            is_new = 0;
                            win.close();
                        } else {
                            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                            // delNew();
                            // is_new = 0;
                            return;
                        }
                    }
                    formPanel.body.mask('Сохранение...');
                    Ext.Ajax.request({
                        url: 'AS_staff_edit.php',
                        success: done,
                        failure: fail,
                        params: {
                            id: id,
                            firstname: firstnameField.getValue(),
                            middlename: middlenameField.getValue(),
                            lastname: lastnameField.getValue(),
                            post: postField.getValue(),
                            birthdate: birthdateField.getValue(),
                            birthplace: birthplaceField.getValue(),
                            gender_id: (Ext.getCmp('genderRGF').getValue()) ? '0' : '1',
                            addr_index: addrIndexField.getValue(),
                            addr_region: addrRegionCombo.getValue(),
                            addr_district: addrDistrictCombo.getValue(),
                            addr_city: addrCityField.getValue(),
                            addr_street: addrStreetField.getValue(),
                            addr_house: addrHouseField.getValue(),
                            addr_build: addrBuildField.getValue(),
                            addr_flat: addrFlatField.getValue(),
                            education_id: educationsCombo.getValue(),
                            comment: commentField.getValue(),
                            inn: innField.getValue(),
                            snils: snilsField.getValue(),
                            phone_work: phoneWorkField.getValue(),
                            phone_home: phoneHomeField.getValue(),
                            user_id: sessvars.userId
                        }
                    });
                }

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новый сотрудник' : 'Редактирование сотрудника',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    autoScroll: true,
                    height: 600,
                    width: 1000,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
							disabled: !checkUserRole('STAFF_E'),
                            text: 'ОК',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
                                    save()
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
                        'close': function (win) {//close( panel, eOpts )
                            delNew();
                        }
                    }
                }).show();
            }
        }
    });



}									