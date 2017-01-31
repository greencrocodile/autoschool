
function createSchoolUnitEditWindow(id,
        name_short,
        name_full,
        addr_index,
        addr_region,
        addr_district,
        addr_city,
        addr_street,
        addr_house,
        addr_build,
        addr_flat,
        inn,
        rs,
        bank_name,
        ks,
        bik,
        license_serial,
        license_number,
        license_giver,
        license_date_start,
        license_date_end,
        reg_number,
        reg_date,
        gibdd_license_number,
        gibdd_license_date_start,
        gibdd_license_date_end,
        rent_contract_number,
        rent_contract_date_start,
        rent_contract_date_end,
        ground_rent_contract_number,
        ground_rent_contract_date_start,
        ground_rent_contract_date_end,
        head_id,
        is_main,
        callback) {

    Ext.define("StaffList", {
        extend: 'Ext.data.Model',
        proxy: {
            type: 'jsonp',
            url: 'AS_staff_list.php',
            extraParams: {start_id: -1},
            reader: {
                type: 'json',
                root: 'list'
            },
            pageSize: 0
        },
        fields: [
            {name: 'id', type: 'int'},
            'full_name'
        ]
    });

    var staffStore = Ext.create('Ext.data.Store', {
        model: 'StaffList',
        listeners: {
            'load': function () {
                staffCombo.setValue(head_id);
            }
        }
    });
    staffStore.load();

    var staffCombo = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Руководитель',
        store: staffStore,
        queryMode: 'local',
        displayField: 'full_name',
        valueField: 'id',
        margin: '5 5 5 5',
        editable: false
    });

    var schoolShortNameField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'Краткое наименование',
        allowBlank: false,
        margin: '5 5 5 5',
        value: name_short
    });

    var schoolFullNameField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'Полное наименование',
        allowBlank: false,
        margin: '5 5 5 5',
        value: name_full
    });

    var schoolAddrIndexField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'индекс',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_index
    });

    var schoolAddrRegionField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'регион',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_region
    });

    var schoolAddrDistrictField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'район',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_district
    });

    var schoolAddrCityField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'город',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_city
    });

    var schoolAddrStreetField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'улица',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_street
    });

    var schoolAddrHouseField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'дом',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_house
    });

    var schoolAddrBuildField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'корпус/строение',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_build
    });

    var schoolAddrFlatField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'помещение',
        allowBlank: false,
        margin: '5 5 5 5',
        value: addr_flat
    });

    var schoolInnField = Ext.create('Ext.form.field.Text', {
        fieldLabel: '�?НН',
        allowBlank: false,
        margin: '5 5 5 5',
        value: inn
    });

    var schoolRSField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'р/с',
        allowBlank: false,
        margin: '5 5 5 5',
        value: rs
    });

    var schoolBankNameField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'Наименование банка',
        allowBlank: false,
        margin: '5 5 5 5',
        value: bank_name
    });

    var schoolKsField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'к/с',
        allowBlank: false,
        margin: '5 5 5 5',
        value: ks
    });

    var schoolBikField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'Б�?К',
        allowBlank: false,
        margin: '5 5 5 5',
        value: bik
    });

    var schoolLicenseSerialField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'серия',
        allowBlank: false,
        margin: '5 5 5 5',
        value: license_serial
    });

    var schoolLicenseNumberField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'номер',
        allowBlank: false,
        margin: '5 5 5 5',
        value: license_number
    });

    var schoolLicenseGiverField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'выдана',
        allowBlank: false,
        margin: '5 5 5 5',
        value: license_giver
    });

    var schoolLicenseDateStartField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'дата выдачи',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: license_date_start
    });

    var schoolLicenseDateEndField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'срок действия',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: license_date_end
    });

    var schoolRegNumberField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'рег. номер',
        allowBlank: false,
        margin: '5 5 5 5',
        value: reg_number
    });

    var schoolRegDateField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'дата регистрации',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: reg_date
    });

    var schoolGibddLicenseNumberField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'номер',
        allowBlank: false,
        margin: '5 5 5 5',
        value: gibdd_license_number
    });

    var schoolGibddLicenseDateStartField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'дата выдачи',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: gibdd_license_date_start
    });

    var schoolGibddLicenseDateEndField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'срок действия',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: gibdd_license_date_end
    });

    var schoolRentContractNumberField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'номер',
        allowBlank: false,
        margin: '5 5 5 5',
        value: rent_contract_number
    });

    var schoolRentContractDateStartField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'дата',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: rent_contract_date_start
    });

    var schoolRentContractDateEndField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'срок действия',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: rent_contract_date_end
    });


    var schoolGroundRentContractNumberField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'номер',
        allowBlank: false,
        margin: '5 5 5 5',
        value: ground_rent_contract_number
    });

    var schoolGroundRentContractDateStartField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'дата',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: ground_rent_contract_date_start
    });

    var schoolGroundRentContractDateEndField = Ext.create('Ext.form.field.Date', {
        fieldLabel: 'срок действия',
        format: 'd.m.Y',
        margin: '5 5 5 5',
        value: ground_rent_contract_date_end
    });

    var mainField = Ext.create('Ext.form.field.Checkbox', {
        fieldLabel: 'главное подразделение',
        value: 'false',
        margin: '5 5 5 5'
    });


    if (is_main == 0) {
        mainField.setValue('false')
    } else {
        mainField.setValue('true')
    }
    ;

    var formPanel = Ext.create('Ext.tab.Panel', {
        items: [
            {
                title: 'Общие сведения',
                bodyCls: 'alt-background',
                items: [
                    Ext.create('Ext.form.Panel', {
                        frame: false,
                        border: false,
                        bodyPadding: 5,
                        bodyCls: 'alt-background',
                        fieldDefaults: {
                            labelAlign: 'left',
                            labelWidth: 150,
                            anchor: '100%'
                        },
                        items: [
                            schoolShortNameField,
                            schoolFullNameField,
                            {
                                xtype: 'fieldset',
                                title: 'Адрес',
                                items: [
                                    schoolAddrIndexField,
                                    schoolAddrRegionField,
                                    schoolAddrDistrictField,
                                    schoolAddrCityField,
                                    schoolAddrStreetField,
                                    schoolAddrHouseField,
                                    schoolAddrBuildField,
                                    schoolAddrFlatField
                                ]
                            },
                            staffCombo,
                            mainField
                        ]
                    })
                ]
            },
            {
                title: 'Реквизиты',
                bodyCls: 'alt-background',
                items: [
                    Ext.create('Ext.form.Panel', {
                        frame: false,
                        border: false,
                        bodyPadding: 5,
                        bodyCls: 'alt-background',
                        fieldDefaults: {
                            labelAlign: 'left',
                            labelWidth: 150,
                            anchor: '100%'
                        },
                        items: [
                            schoolInnField,
                            schoolRSField,
                            schoolBankNameField,
                            schoolKsField,
                            schoolBikField
                        ]
                    })
                ]
            },
            {
                title: 'Регистрация',
                bodyCls: 'alt-background',
                items: [
                    Ext.create('Ext.form.Panel', {
                        frame: false,
                        border: false,
                        bodyPadding: 5,
                        bodyCls: 'alt-background',
                        fieldDefaults: {
                            labelAlign: 'left',
                            labelWidth: 150,
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Регистрация',
                                items: [
                                    schoolRegNumberField,
                                    schoolRegDateField
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Лицензия',
                                items: [
                                    schoolLicenseSerialField,
                                    schoolLicenseNumberField,
                                    schoolLicenseGiverField,
                                    schoolLicenseDateStartField,
                                    schoolLicenseDateEndField
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Лицензия Г�?БДД',
                                items: [
                                    schoolGibddLicenseNumberField,
                                    schoolGibddLicenseDateStartField,
                                    schoolGibddLicenseDateEndField
                                ]
                            }
                        ]
                    })
                ]
            },
            {
                title: 'Аренда',
                bodyCls: 'alt-background',
                items: [
                    Ext.create('Ext.form.Panel', {
                        frame: false,
                        border: false,
                        bodyPadding: 5,
                        bodyCls: 'alt-background',
                        fieldDefaults: {
                            labelAlign: 'left',
                            labelWidth: 150,
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Договор аренды',
                                items: [
                                    schoolRentContractNumberField,
                                    schoolRentContractDateStartField,
                                    schoolRentContractDateEndField
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Договор аренды площадки',
                                items: [
                                    schoolGroundRentContractNumberField,
                                    schoolGroundRentContractDateStartField,
                                    schoolGroundRentContractDateEndField
                                ]
                            }
                        ]
                    })
                ]
            }
        ]
    });


    function saveSchoolUnitData() {

        function failSaveSchoolUnit(result, request) {
            formPanel.body.unmask();
            Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
        }
        ;
        function doneSaveSchoolUnit(result, request) {
            formPanel.body.unmask();
            if (result.responseText.substr(0, 2) == 'ok') {
                if (callback) {
                    callback(parseInt(result.responseText.substr(3)))
                }
                school_unit_win.close();
            } else {
                Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                return;
            }
        }
        formPanel.body.mask('Сохранение...');
        if (mainField.getValue()) {
            p_main = 1
        } else {
            p_main = 0
        }
        Ext.Ajax.request({
            url: 'AS_school_unit_edit.php',
            success: doneSaveSchoolUnit,
            failure: failSaveSchoolUnit,
            params: {
                id: id,
                name_short: schoolShortNameField.getValue(),
                name_full: schoolFullNameField.getValue(),
                addr_index: schoolAddrIndexField.getValue(),
                addr_region: schoolAddrRegionField.getValue(),
                addr_district: schoolAddrDistrictField.getValue(),
                addr_city: schoolAddrCityField.getValue(),
                addr_street: schoolAddrStreetField.getValue(),
                addr_house: schoolAddrHouseField.getValue(),
                addr_build: schoolAddrBuildField.getValue(),
                addr_flat: schoolAddrFlatField.getValue(),
                inn: schoolInnField.getValue(),
                rs: schoolRSField.getValue(),
                bank_name: schoolBankNameField.getValue(),
                ks: schoolKsField.getValue(),
                bik: schoolBikField.getValue(),
                license_serial: schoolLicenseSerialField.getValue(),
                license_number: schoolLicenseNumberField.getValue(),
                license_giver: schoolLicenseGiverField.getValue(),
                license_date_start: (schoolLicenseDateStartField.getValue() == null) ? '' : schoolLicenseDateStartField.getValue(),
                license_date_end: (schoolLicenseDateEndField.getValue() == null) ? '' : schoolLicenseDateEndField.getValue(),
                reg_number: schoolRegNumberField.getValue(),
                reg_date: schoolRegDateField.getValue(),
                gibdd_license_number: schoolGibddLicenseNumberField.getValue(),
                gibdd_license_date_start: (schoolGibddLicenseDateStartField.getValue() == null) ? '' : schoolGibddLicenseDateStartField.getValue(),
                gibdd_license_date_end: (schoolGibddLicenseDateEndField.getValue() == null) ? '' : schoolGibddLicenseDateEndField.getValue(),
                rent_contract_number: schoolRentContractNumberField.getValue(),
                rent_contract_date_start: (schoolRentContractDateStartField.getValue() == null) ? '' : schoolRentContractDateStartField.getValue(),
                rent_contract_date_end: (schoolRentContractDateEndField.getValue() == null) ? '' : schoolRentContractDateEndField.getValue(),
                ground_rent_contract_number: schoolGroundRentContractNumberField.getValue(),
                ground_rent_contract_date_start: (schoolGroundRentContractDateStartField.getValue() == null) ? '' : schoolGroundRentContractDateStartField.getValue(),
                ground_rent_contract_date_end: (schoolGroundRentContractDateEndField.getValue() == null) ? '' : schoolGroundRentContractDateEndField.getValue(),
                head_id: staffCombo.getValue(),
                is_main: p_main,
                user_id: sessvars.userId}
        });
    }

    var school_unit_win = new Ext.Window({
        title: (id == -1) ? 'Новое отделение школы' : 'Редактирование отделения школы',
        layout: 'fit',
        resizable: false,
        modal: true,
        autoScroll: true,
        height: 450,
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
                        saveSchoolUnitData();
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
                        school_unit_win.close();
                    }
                }
            }

        ]
    }).show();
}