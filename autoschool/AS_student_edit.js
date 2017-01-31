function editStudent(id, is_new, callback) {
    //**********variables**********
	
	var selectedDocumentId = -1;
	var selectedGivenDocumentId = -1;
	var selectedAccrualId = -1;
	var studentId = -1;
	
    //**********stores**********
    var studentsStore = Ext.create('Ext.data.Store', {
		model: 'StudentsOperationsModel',
		proxy: {
			type: 'jsonp',
			url: 'AS_students_operations_list.php',
			extraParams: {id: -1},
			simpleSortMode: true,
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
		remoteSort: true,
		pageSize: 10,
		sorters: [{
			property: 'full_name',
			direction: 'ASC'
		}]
	});
    studentsStore.getProxy().extraParams = {id: id};
    studentsStore.load({
        callback: function (records, operation, success) {
            var student = studentsStore.getById(id);
            if (student) {
				studentId = (is_new==1)?-1:student.data.student_id;
				var staffStore = Ext.create('Ext.data.Store', {
					model: 'StaffModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_staff_list.php',
						extraParams: {start_id: -1, active_only: 1, whole_as: 0},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'initials_name',
						direction: 'ASC'
					}],
					listeners:{
						load: function(){
							staffCombo.setValue(student.data.staff_id);
						}
					}
				});

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
					pageSize: 1000000000,
					sorters: [{
						property: 'name',
						direction: 'ASC'
					}]
				});
				documentsStore.getProxy().extraParams = {vehicle_id: -1, student_operation_id: student.data.id, given_student_operation_id: -1, staff_id: -1};
				documentsStore.load();
				
				var givenDocumentsStore = Ext.create('Ext.data.Store', {
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
					pageSize: 1000000000,
					sorters: [{
						property: 'name',
						direction: 'ASC'
					}]
				});
				givenDocumentsStore.getProxy().extraParams = {vehicle_id: -1, student_operation_id: -1, given_student_operation_id: student.data.id, staff_id: -1};
				givenDocumentsStore.load();

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
					sorters: [{
						property: 'name',
						direction: 'ASC'
					}],
					listeners: {
						load: function(){
							educationsCombo.setValue(student.data.education_id);
						}
					}
				});

				
				var statusesStore = Ext.create('Ext.data.Store', {
					model: 'StatusesModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_statuses_list.php',
						extraParams: {start_id: -1},
						reader: {
							root: 'list',
							totalProperty: 'total'
						},
						simpleSortMode: true
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'name',
						direction: 'ASC'
					}],
					listeners: {
						load: function(){
							statusesCombo.setValue(student.data.status_id);
						}
					}
				});

				var groupRegStore = Ext.create('Ext.data.Store', {
					model: 'GroupRegModel',
					data: [
						{id: 0, name: 'вне группы'},
						{id: 1, name: 'в составе группы'}
					]
				});
				
				var gearboxStore = Ext.create('Ext.data.Store', {
					model: 'GearboxModel',
					data: [
						{id: -1, name: '-----'},
						{id: 1, name: 'механическая (МКПП)'},
						{id: 2, name: 'автоматическая (АКПП)'}
					]
				});
				
				var expulsionReasonsStore = Ext.create('Ext.data.Store', {
					model: 'ExpulsionReasonsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_expulsion_reasons_list.php',
						extraParams: {start_id: -1},
						reader: {
							root: 'list',
							totalProperty: 'total'
						},
						simpleSortMode: true
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'name',
						direction: 'ASC'
					}],
					listeners: {
						load: function(){
							expulsionReasonsCombo.setValue(student.data.expulsion_reason_id);
						}
					}
				});

				
				
		        var accrualsStore = Ext.create('Ext.data.Store', {
					model: 'StudentAccrualsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_student_accruals_list.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'id',
						direction: 'ASC'
					}],
					listeners: {
						load: function(){
							totalAccrualsStore.reload();
							saldoStore.reload();
						}
					}
				});
				
				if (checkUserRole('SPA_R')){
					accrualsStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					accrualsStore.getProxy().extraParams = {student_operation_id: -2};
				}
				accrualsStore.load();

				var paymentsStore = Ext.create('Ext.data.Store', {
					model: 'StudentPaymentsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_student_payments_list.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
							property: 'id',
							direction: 'ASC'
						}],
					listeners: {
						load: function(){
							totalPaymentsStore.reload();
							saldoStore.reload();
						}
					}
				});
				
				if (checkUserRole('SP_R')){
					paymentsStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					paymentsStore.getProxy().extraParams = {student_operation_id: -2};
				}
				paymentsStore.load();
				
				var totalAccrualsLabel = Ext.create('Ext.form.Label', {
					region: 'north',
					frame: true,
					margin: '10 10 10 10'
				});

				var totalAccrualsStore = Ext.create('Ext.data.Store', {
					model: 'StudentTotalAccrualsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_student_total_accruals.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					listeners:{
						load: function(){
							rec = totalAccrualsStore.first();
							if (rec) {
								value = rec.data.total_accruals;
								totalAccrualsLabel.setText('<span style="font-size: 180%; color: green">&nbsp;Начислено: ' + value + '&nbsp;</span>', false);
							} else {
								totalAccrualsLabel.setText('', false);
							}
						}
					}
				});
				if (checkUserRole('SPA_R')){
					totalAccrualsStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					totalAccrualsStore.getProxy().extraParams = {student_operation_id: -2};
				}
				totalAccrualsStore.load();

				var totalPaymentsLabel = Ext.create('Ext.form.Label', {
					region: 'north',
					frame: true,
					margin: '10 10 10 10'
				});
				
				var totalPaymentsStore = Ext.create('Ext.data.Store', {
					model: 'StudentTotalPaymentsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_student_total_payments.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					listeners:{
						load: function(){
							rec = totalPaymentsStore.first();
							if (rec) {
								value = rec.data.total_payments;
								totalPaymentsLabel.setText('<span style="font-size: 180%; color: green">&nbsp;Оплачено: ' + value + '&nbsp;</span>', false);
							} else {
								totalPaymentsLabel.setText('', false);
							}
						}
					}
				});
				if (checkUserRole('SPA_R')){
					totalPaymentsStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					totalPaymentsStore.getProxy().extraParams = {student_operation_id: -2};
				}
				totalPaymentsStore.load();

				var saldoLabel = Ext.create('Ext.form.Label', {
					region: 'north',
					frame: true,
					margin: '10 10 10 10'
				});
				
				var saldoStore = Ext.create('Ext.data.Store', {
					model: 'StudentSaldoModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_student_saldo.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					listeners: {
						load: function(){
							rec = saldoStore.first();
							if (rec) {
								value = rec.data.saldo;
								if (value != 0) {
									saldoLabel.setText('<span style="font-size: 180%; color: red">&nbsp;Осталось оплатить: ' + value + '&nbsp;</span>', false);
								} else {
									saldoLabel.setText('', false);
								}
							} else {
								saldoLabel.setText('', false);
							}
						}
					}
				});
				
				if (checkUserRole('SPA_R') && checkUserRole('SP_R')){
					saldoStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					saldoStore.getProxy().extraParams = {student_operation_id: -2};
				}
				saldoStore.load();

				var driveLessonsStore = Ext.create('Ext.data.Store', {
					model: 'DriveLessonsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_student_drive_lessons_list.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
				});
				driveLessonsStore.getProxy().extraParams = {student_operation_id: student.data.id};
				driveLessonsStore.load();

				var examSchoolStore = Ext.create('Ext.data.Store', {
					model: 'StudentSchoolExamsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_school_exams_list.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
				});
				
				if(checkUserRole('EGS_R')){
					examSchoolStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					examSchoolStore.getProxy().extraParams = {student_operation_id: -2};
				}
				examSchoolStore.load();

				var examGibddStore = Ext.create('Ext.data.Store', {
					model: 'StudentGibddExamsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_gibdd_exams_list.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
				});
				
				if(checkUserRole('EGG_R')){
					examGibddStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					examGibddStore.getProxy().extraParams = {student_operation_id: -2};
				}
				examGibddStore.load();
				
				var testsStore = Ext.create('Ext.data.Store', {
					model: 'StudentTestsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_tests_list.php',
						extraParams: {student_operation_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
				});
				if(checkUserRole('TESTS_R')){
					testsStore.getProxy().extraParams = {student_operation_id: student.data.id};
				} else {
					testsStore.getProxy().extraParams = {student_operation_id: -1};
				}
				testsStore.load();
				
				 var regionsStore = Ext.create('Ext.data.Store', {
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
                            addrRegionCombo.setValue(student.data.addr_region);
                        }
                    }
                });
                regionsStore.getProxy().extraParams = {start_id: -1};
                regionsStore.load();

                var districtsStore = Ext.create('Ext.data.Store', {
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
                            addrDistrictCombo.setValue(student.data.addr_district);
                        }
                    }
                });
                districtsStore.getProxy().extraParams = {start_id: -1, region_id: student.data.addr_region};
                districtsStore.load();
				
				var driveLessonsCountStore = Ext.create('Ext.data.Store', {
                    model: 'StudentsDriveLessonsCountModel',
                    proxy: {
                        type: 'jsonp',
                        url: 'AS_student_drive_lessons_count_list.php',
                        extraParams: {student_operation_id: -1},
                        reader: {
                            root: 'list'
                        },
                        simpleSortMode: true
                    },
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
							var rec = driveLessonsCountStore.getById(student.data.id);
							if(rec){
								driveLessonsLabel.setText('<span style="font-size: 100%; background-color: yellow; color: black">&nbsp;Всего занятий: ' + rec.data.drive_lessons_total + '. Из них: по программе - ' + rec.data.drive_lessons_program + ', город - ' + rec.data.drive_lessons_city + ', полигон - ' + rec.data.drive_lessons_polygon + ', дополнительно - ' + rec.data.drive_lessons_add + '.&nbsp;</span>', false);
							} else {
								driveLessonsLabel.setText('', false);
							}
                        }
                    }
                });
                driveLessonsCountStore.getProxy().extraParams = {student_operation_id: student.data.id};
                driveLessonsCountStore.load();
				
				
				

                //**********fields**********
				 var genderRG = Ext.create('Ext.form.RadioGroup', {
                    fieldLabel: 'пол',
                    columns: 2,
                    vertical: true,
                    width: 200,
                    margin: '3 3 3 3',
					labelAlign: 'right',
                    items: [
                        {boxLabel: 'Ж', name: 'genderRG', id: 'genderRGF', inputValue: '0'},
                        {boxLabel: 'М', name: 'genderRG', id: 'genderRGM', inputValue: '1'},
                    ]
                });
				
				if (student.data.gender_id == '0') {
                    Ext.getCmp('genderRGF').setValue(true);
                    Ext.getCmp('genderRGM').setValue(false);
                }
                if (student.data.gender_id == '1') {
                    Ext.getCmp('genderRGF').setValue(false);
                    Ext.getCmp('genderRGM').setValue(true);
                }
				
				var addrRegionCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Регион',
                    store: regionsStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '3 3 3 3',
                    editable: false,
					listeners: {
						select: function (combo, records, eOpts) {
							addrDistrictCombo.setValue(-1);
							districtsStore.getProxy().extraParams = {region_id: addrRegionCombo.getValue(),start_id: -1};
							districtsStore.load({
								callback: function(records, operation, success){
									addrDistrictCombo.setValue(-1);
								}
							});
						}
					}
                });

                var addrDistrictCombo = Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Район',
                    store: districtsStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    margin: '3 3 3 3',
                    editable: false
                });
				
				var educationsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Образование',
					store: educationsStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					editable: false
				});
				
				educationsStore.getProxy().extraParams = {start_id: -1};
				educationsStore.load();

				var statusesCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'статус',
					store: statusesStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					editable: false
				});
				
				statusesStore.getProxy().extraParams = {start_id: -1};
				statusesStore.load();

				var groupRegCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'регистрация в группе',
					store: groupRegStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					editable: false,
					value: student.data.group_reg
				});
								
				var gearboxCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'КПП',
					store: gearboxStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					editable: false,
					value: student.data.gearbox
				});

				var expulsionReasonsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'причина',
					store: expulsionReasonsStore,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'id',
					margin: '3 3 3 3',
					editable: false
				});
				expulsionReasonsStore.getProxy().extraParams = {start_id: -1};
				expulsionReasonsStore.load();

				var staffCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'инструктор',
					store: staffStore,
					queryMode: 'local',
					displayField: 'initials_name',
					valueField: 'id',
					margin: '3 3 3 3',
					editable: false
				});
				
				staffStore.getProxy().extraParams = {start_id: -1, learning_group_id: student.data.learning_group_id, active_only: 1};
				staffStore.load();
				
				var schoolUnitsStore = Ext.create('Ext.data.Store', {
					model: 'SchoolUnitsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_school_units_list.php',
						extraParams: {start_id: -1, active_only: 1, whole_as: 0},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					remoteSort: true,
					pageSize: 1000000000,
					sorters: [{
						property: 'name_full',
						direction: 'ASC'
					}],
					listeners:{
						load: function(){
							schoolUnitsCombo.setValue(student.data.school_unit_id);
						}
					}
				});
				schoolUnitsStore.getProxy().extraParams = {start_id: -1, active_only: 1, whole_as: 0};
				schoolUnitsStore.load();
				
				var schoolUnitsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'место занятий',
					store: schoolUnitsStore,
					queryMode: 'local',
					displayField: 'name_full',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					hidden: (student.data.learning_program_type == 0),
					editable: false
				});
				
				var lProgramPricesStore = Ext.create('Ext.data.Store', {
					model: 'LProgramPriceHistoryModel',
					remoteSort: true,
					pageSize: 1000000000,
					proxy: {
						type: 'jsonp',
						url: 'AS_lprogram_price_history_list.php',
						extraParams: {learning_program_id: 0,start_id: -1},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					sorters: [{
						property: 'date_begin',
						direction: 'DESC'
					}],
					listeners:{
						load: function(){
							lProgramPricesCombo.setValue(student.data.price_id);
						}
					}
				});
				lProgramPricesStore.getProxy().extraParams = {learning_program_id: student.data.learning_program_id,start_id: -1};
				lProgramPricesStore.load();
				
				var lProgramPricesCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Стоимость',
					store: lProgramPricesStore,
					queryMode: 'local',
					displayField: 'price',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					hidden: (student.data.learning_program_type == 0),
					editable: false
				});
				
				var postField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'должность',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.post_name
				});
				
				var innField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'ИНН',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.inn
				});
				
				var categoryField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'категория',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.category
				});

				var workPlaceField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'место работы',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.work_place
				});

				var firstnameField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Имя',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.firstname
				});

				var middlenameField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Отчество',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.middlename
				});

				var lastnameField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Фамилия',
					allowBlank: false,
					margin: '3 3 3 3',
					value: student.data.lastname
				});

				var birthdateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'Дата рождения',
					labelWidth: 100,
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: student.data.birthdate
				});

				var birthplaceField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Место рождения',
					anchor: '100%',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.birthplace
				});

				var addrIndexField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'индекс',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.addr_index
				});

				var addrCityField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'город',
					anchor: '100%',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.addr_city
				});

				var addrStreetField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'улица',
					anchor: '100%',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.addr_street
				});

				var addrHouseField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'дом',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.addr_house
				});

				var addrBuildField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'корпус',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.addr_build
				});

				var addrFlatField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'кв.',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.addr_flat
				});

				var phoneHomeField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'т. дом.',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.phone_home
				});

				var phoneWorkField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'т. раб.',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.phone_work
				});

				var phoneCellField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'т. моб.',
					allowBlank: true,
					margin: '3 3 3 3',
					value: student.data.phone_cell
				});

				var numberInGroupField = Ext.create('Ext.form.field.Number', {
					fieldLabel: '№ в группе',
					allowBlank: true,
					readOnly: true,
					margin: '3 3 3 3',
					value: student.data.number_in_group
				});

				var cardNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: '№ карточки',
					allowBlank: true,
					readOnly: true,
					margin: '3 3 3 3',
					value: student.data.card_number
				});

			  
				var groupNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: '№ группы',
					readOnly: true,
					margin: '3 3 3 3',
					hidden: (student.data.learning_program_type == 1),
					value: student.data.learning_group_number
				});
				
				var cardNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: '№ карточки наката',
					margin: '3 3 3 3',
					value: student.data.card_number
				});

				var programNameField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'программа обучения',
					readOnly: true,
					margin: '3 3 3 3',
					value: student.data.learning_program_name_short
				});

				var priceField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'стоимость',
					readOnly: true,
					margin: '3 3 3 3',
					hidden: (student.data.learning_program_type == 1),
					value: student.data.price
				});

				
				var placeField = Ext.create('Ext.form.field.Text', {
					fieldLabel: 'место',
					readOnly: true,
					margin: '3 3 3 3',
					hidden: (student.data.learning_program_type == 1),
					value: student.data.school_unit_name_short
				});

				var startDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'начало',
					width: 200,
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: student.data.date_start
				});

				var endDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'окончание',
					width: 200,
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: student.data.date_end
				});

				var expulsionOrderNumberField = Ext.create('Ext.form.field.Text', {
					fieldLabel: '№ приказа',
					margin: '3 3 3 3',
					value: student.data.expulsion_order_number
				});

				var expulsionDateField = Ext.create('Ext.form.field.Date', {
					fieldLabel: 'дата',
					format: 'd.m.Y',
					margin: '3 3 3 3',
					value: student.data.expulsion_date
				});

				var commentField = Ext.create('Ext.form.field.TextArea', {
					maxLength: 8000,
					anchor: '100%',
					margin: '3 3 3 3',
					value: student.data.comment
				});
                //**********grids**********

				var accrualsGrid = Ext.create('Ext.grid.Panel', {
					store: accrualsStore,
					region: 'center',
					margin: '10 0 10 0',
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					columns: [{
							dataIndex: 'payment_type_name',
							text: 'тип платежа',
							flex: 2,
							sortable: true
						}, {
							dataIndex: 'value',
							text: 'сумма',
							flex: 2,
							sortable: true
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: accrualsStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					}),
					listeners: {
						itemclick: function (view, record) {
							if (record) {
								selectedAccrualId = record.data.id;
							}
						},
						itemdblclick: function (view, record) {
							if (record) {
								selectedAccrualId = record.data.id;
								if(checkUserRole('FL_CARD_E')){
									editAccrual(record.data.id,0,function(){
										accrualsStore.reload();
									})
								}
							}
						}
					}
				});
				
				var paymentsGrid = Ext.create('Ext.grid.Panel', {
					store: paymentsStore,
					margin: '10 0 10 0',
					disableSelection: false,
					region: 'center',
					rowLines: true,
					columnLines: true,
					columns: [{
							dataIndex: 'payment_date',
							text: 'дата платежа',
							renderer: Ext.util.Format.dateRenderer('d.m.Y'),
							flex: 2
						}, {
							dataIndex: 'payment_type_name',
							text: 'тип платежа',
							flex: 2
						}, {
							dataIndex: 'value',
							text: 'сумма',
							flex: 2
						}, {
							dataIndex: 'school_unit_name_short',
							text: 'место',
							flex: 2
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: paymentsStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					})
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
                                if (checkUserRole('FL_CARD_E')) {
                                    editDocument(record.data.id,0,function (id) {
										documentsStore.reload();
									});
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

				var givenDocumentsGrid = Ext.create('Ext.grid.Panel', {
                    rowLines: true,
                    columnLines: true,
					region: 'center',
                    store: givenDocumentsStore,
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
                        store: givenDocumentsStore,
                        displayInfo: true,
                        displayMsg: '{0} - {1} из {2}',
                        emptyMsg: 'Список пуст'
                    }),
                    listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                selectedGivenDocumentId = record.data.id;
                                if (checkUserRole('FL_CARD_E')) {
                                    editDocument(record.data.id,0,function (id) {
										givenDocumentsStore.reload();
									});
                                }
                            }
                        },
                        itemclick: function (view, record) {
                            if (record) {
                                selectedGivenDocumentId = record.data.id;
                            }
                        }
                    }
                });
				
				var driveLessonsGrid = Ext.create('Ext.grid.Panel', {
					store: driveLessonsStore,
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					region: 'center',
					columns: [{
							dataIndex: 'staff_initials_name',
							text: 'инструктор',
							flex: 2
						}, {
							dataIndex: 'date',
							text: 'дата',
							flex: 2,
							renderer: Ext.util.Format.dateRenderer('d.m.Y')
						}, {
							dataIndex: 'model_name',
							text: 'автомобиль',
							flex: 2
						}, {
							dataIndex: 'reg_number',
							text: 'ГРЗ',
							flex: 2
						}, {
							dataIndex: 'number',
							text: 'Путевой лист',
							flex: 2
						}, {
							dataIndex: 'place',
							text: 'место занятий',
							flex: 2
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: driveLessonsStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					})
				});

				var examSchoolGrid = Ext.create('Ext.grid.Panel', {
					store: examSchoolStore,
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					region: 'center',
					columns: [
						{
							dataIndex: 'exam_date',
							text: 'Дата',
							renderer: Ext.util.Format.dateRenderer('d.m.Y'),
							width: 100,
							sortable: false
						}, {
							dataIndex: 'type_name',
							text: 'Вид экзамена',
							width: 200,
							sortable: false
						}, {
							dataIndex: 'category',
							text: 'Категория',
							width: 100,
							sortable: false
						}, {
							dataIndex: 'result',
							text: 'результат',
							width: 200,
							sortable: false
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: examSchoolStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					})
				});

				var examGibddGrid = Ext.create('Ext.grid.Panel', {
					store: examGibddStore,
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					region: 'center',
					columns: [
						{
							dataIndex: 'exam_date',
							text: 'Дата',
							renderer: Ext.util.Format.dateRenderer('d.m.Y'),
							width: 100,
							sortable: false
						}, {
							dataIndex: 'type_name',
							text: 'Вид экзамена',
							width: 200,
							sortable: false
						}, {
							dataIndex: 'category',
							text: 'Категория',
							width: 100,
							sortable: false
						}, {
							dataIndex: 'result_name',
							text: 'результат',
							width: 200,
							sortable: false
						}, {
							dataIndex: 'motive_name',
							text: 'причина недопуска',
							width: 200,
							sortable: false
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: examGibddStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					})
				});
				
				var testsGrid = Ext.create('Ext.grid.Panel', {
					store: testsStore,
					disableSelection: false,
					rowLines: true,
					columnLines: true,
					region: 'center',
					columns: [
						{
							dataIndex: 'exam_date',
							text: 'Дата',
							renderer: Ext.util.Format.dateRenderer('d.m.Y'),
							width: 100,
							sortable: false
						}, {
							dataIndex: 'type_name',
							text: 'Вид экзамена',
							width: 200,
							sortable: false
						}, {
							dataIndex: 'category',
							text: 'Категория',
							width: 100,
							sortable: false
						}, {
							dataIndex: 'result_name',
							text: 'результат',
							width: 200,
							sortable: false
						}, {
							dataIndex: 'motive_name',
							text: 'причина недопуска',
							width: 200,
							sortable: false
						}
					],
					bbar: Ext.create('Ext.PagingToolbar', {
						store: testsStore,
						displayInfo: true,
						displayMsg: '{0} - {1} из {2}',
						emptyMsg: 'Список пуст'
					}),
					listeners: {
                        itemdblclick: function (view, record) {
                            if (record) {
                                selectedGivenDocumentId = record.data.id;
                                if (checkUserRole('TESTS_E')) {
                                    editSchoolTest(record.data.id,0,function () {
										testsStore.reload();
									});
                                }
                            }
                        }
                    }
					
				});
				
				//**********buttons**********
				var bSearchStudent = Ext.create('Ext.Button', {
					text: 'Поиск',
					margin: '0 5 5 5',
					disabled: !checkUserRole('FL_CARD_E'),
					// hidden: true,
					listeners: {
						click: function () {
							studentSearch(firstnameField.getValue(), middlenameField.getValue(), lastnameField.getValue(),
							function (id) {
								studentId = id;
								
								var studentsStore = Ext.create('Ext.data.Store', {
									model: 'StudentsModel',
									proxy: {
										type: 'jsonp',
										url: 'AS_students_list.php',
										extraParams: {id:id},
										simpleSortMode: true,
										reader: {
											root: 'list',
											totalProperty: 'total'
										}
									},
									pageSize: 1000000000,
								});
								studentsStore.load({
									callback: function (records, operation, success) {
										stud = studentsStore.getById(id);
										if (stud){
											lastnameField.setValue(stud.data.lastname);
											firstnameField.setValue(stud.data.firstname);
											middlenameField.setValue(stud.data.middlename);
											birthdateField.setValue(stud.data.birthdate);
											if (stud.data.gender_id == '0') {
												Ext.getCmp('genderRGF').setValue(true);
												Ext.getCmp('genderRGM').setValue(false);
											}
											if (stud.data.gender_id == '1') {
												Ext.getCmp('genderRGF').setValue(false);
												Ext.getCmp('genderRGM').setValue(true);
											}
											birthplaceField.setValue(stud.data.birthplace);
											addrIndexField.setValue(stud.data.addr_index);
											addrRegionCombo.setValue(stud.data.addr_region);
											districtsStore.getProxy().extraParams = {region_id: addrRegionCombo.getValue(),start_id: -1};
											districtsStore.load({
												callback: function (records, operation, success) {
													addrDistrictCombo.setValue(stud.data.addr_district);
											}});
											
											addrCityField.setValue(stud.data.addr_city);
											addrStreetField.setValue(stud.data.addr_street);
											addrHouseField.setValue(stud.data.addr_house);
											addrBuildField.setValue(stud.data.addr_build);
											addrFlatField.setValue(stud.data.addr_flat);
											phoneHomeField.setValue(stud.data.phone_home);
											phoneWorkField.setValue(stud.data.phone_work);
											phoneCellField.setValue(stud.data.phone_cell);
											educationsCombo.setValue(stud.data.education_id);
											workPlaceField.setValue(stud.data.work_place);
											postField.setValue(stud.data.post_name);
											innField.setValue(stud.data.inn);
											groupRegCombo.setValue(1);
											statusesCombo.setValue(1);
										}
									}
								})
								
							})
						}
					}
				});
                //**********panels**********

				
				var editAccrualsPanel = Ext.create('Ext.panel.Panel', {
					bodyCls: 'alt-background',
					region:'north',
					border: false,
					items: [
						{
							xtype: 'button',
							disabled: !checkUserRole('SPA_E'),
							text: 'Добавить начисления из программы',
							margin: '0 5 0 0',
							listeners: {
								click: function () {
									loadAccrualsFromProgram(student.data.id, student.data.price_id, student.data.learning_program_id, function(){
										accrualsStore.reload();
									});
								}
							}
						},
						{
							xtype: 'button',
							text: 'Добавить',
							disabled: !checkUserRole('SPA_A'),
							margin: '0 5 0 0',
							listeners: {
								click: function () {
									addAccrual(
										function (id) {
											editAccrual(id, 1, function () {
												accrualsStore.reload();
											})
										}									
									)
								}
							}
						},
						{
							xtype: 'button',
							disabled: !checkUserRole('SPA_D'),
							text: 'Удалить',
							listeners: {
								click: function () {
									deleteStudentAccrual(selectedAccrualId, function () {
										accrualsStore.reload();
									})
								}
							}

						}
					]
				});
				
				var editDocumentPanel = Ext.create('Ext.panel.Panel', {
					bodyCls: 'alt-background',
					region:'north',
					border: false,
					items: [
						{
							xtype: 'button',
							text: 'Новый документ',
							disabled: !checkUserRole('FL_CARD_E'),
							margin: '0 5 0 0',
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
							disabled: !checkUserRole('FL_CARD_E'),
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

				var editGivenDocumentPanel = Ext.create('Ext.panel.Panel', {
					bodyCls: 'alt-background',
					region: 'north',
					border: false,
					items: [
						{
							xtype: 'button',
							text: 'Новый документ',
							disabled: !checkUserRole('FL_CARD_E'),
							margin: '0 5 0 0',
							listeners: {
								click: function () {
									addGivenDocument(
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
							disabled: !checkUserRole('FL_CARD_E'),
							listeners: {
								click: function () {
									deleteDocument(selectedGivenDocumentId, function () {
										documentsStore.reload();
									})
								}
							}
						}
					]
				});

				var driveLessonsLabel = Ext.create('Ext.form.Label', {
					frame: true,
					region:'south',
					margin: '10 10 10 10'
				});
				
				var studentInfoTab = Ext.create('Ext.panel.Panel', {
					id: 'studentInfoTab',
					bodyCls: 'alt-background',
					title: 'основные данные',
					layout: 'border',
					items: [
						Ext.create('Ext.form.Panel', {
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 3,
							region: 'west',
							width: 500,
							fieldDefaults: {
								labelAlign: 'left',
								labelWidth: 100
							},
							items: [
								lastnameField,
								firstnameField,
								middlenameField,
								bSearchStudent,
								{
									xtype: 'fieldcontainer',
									layout: 'hbox',
									items: [
										birthdateField,
										genderRG
									]
								},
								
								birthplaceField,
								{
									xtype: 'fieldset',
									title: 'Адрес',
									fieldDefaults: {
										labelAlign: 'left',
										labelWidth: 50
									},
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
										addrCityField,
										addrStreetField,
										{
											xtype: 'fieldcontainer',
											layout: 'hbox',
											defaults: {
												flex: 1
											},
											items: [
												addrHouseField,
												addrBuildField,
												addrFlatField
											]
										}
									]
								},
								phoneHomeField,
								phoneWorkField,
								phoneCellField,
								educationsCombo,
								workPlaceField,
								postField,
								innField
							]
						}),
						Ext.create('Ext.form.Panel', {
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 3,
							region: 'center',
							fieldDefaults: {
								labelAlign: 'left',
								labelWidth: 100
							},
							items: [
								{
									xtype: 'fieldset',
									region:'north',
									title: 'Реквизиты обучения',
									items: [
										programNameField,
										priceField,
										lProgramPricesCombo,
										placeField,
										schoolUnitsCombo,
										{
											xtype: 'fieldcontainer',
											layout: 'hbox',
											items: [
												startDateField,
												endDateField
											]
										},
										staffCombo,
										groupNumberField,
										cardNumberField,
										gearboxCombo
									]
								},
								{
									xtype: 'fieldset',
									region:'north',
									title: 'Текущее состояние',
									items: [
										statusesCombo,
										groupRegCombo
									]
								},
								{
									xtype: 'fieldset',
									region:'north',
									title: 'Реквизиты отчисления',
									items: [
										expulsionDateField,
										expulsionOrderNumberField,
										expulsionReasonsCombo
									]
								},
								{
									xtype: 'fieldset',
									region:'center',
									title: 'комментарии',
									items: [
										commentField
									]
								}

							]
						})

					]
				});

				var studentDocTab = Ext.create('Ext.panel.Panel', {
					id: 'studentsDocTab',
					bodyCls: 'alt-background',
					title: 'документы',
					bodyCls: 'alt-background',
					bodyPadding: 3,
					layout: 'border',
					items: [
						{
							xtype: 'fieldset',
							layout:'border',
							region:'north',
							height: 280,
							title: 'Предоставленные документы',
							items: [
								editDocumentPanel,
								documentsGrid
							]
						}, {
							xtype: 'fieldset',
							layout:'border',
							region:'north',
							height: 280,
							title: 'Выданные документы',
							items: [
								editGivenDocumentPanel,
								givenDocumentsGrid
							]
						}
					]
				});

				var studentPayTab = Ext.create('Ext.panel.Panel', {
					id: 'studentPayTab',
					bodyCls: 'alt-background',
					title: 'накат и оплата',
					layout: 'border',
					items: [
						
						saldoLabel,
						Ext.create('Ext.form.Panel', {
							region: 'north',
							layout: 'border',
							height: 300,
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 3,
							items: [

								{
									xtype: 'fieldset',
									region: 'west',
									width: 500,
									title: 'Начисления',
									items: [
										totalAccrualsLabel,
										editAccrualsPanel,
										accrualsGrid
									]
								},
								
								{
									xtype: 'fieldset',
									title: 'Платежи',
									layout: 'border',
									region: 'center',
									items: [
										totalPaymentsLabel,
										paymentsGrid
									]
								}
									

							]
						}),
						Ext.create('Ext.form.Panel', {
							region: 'center',
							bodyCls: 'alt-background',
							border: false,
							layout:'border',
							bodyPadding: 3,
							items: [
								driveLessonsGrid,
								driveLessonsLabel
							]
						})

					]
				});

				var studentExamTab = Ext.create('Ext.panel.Panel', {
					id: 'studentExamTab',
					bodyCls: 'alt-background',
					layout: 'border',
					title: 'зачёты и экзамены',
					items: [
						Ext.create('Ext.form.Panel', {
							region: 'north',
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 3,
							items: [
								{
									xtype: 'fieldset',
									layout: 'border',
									region:'north',
									height: 150,
									title: 'Зачёты',
									items: [
										testsGrid
									]
								}
							]
						}),
						Ext.create('Ext.form.Panel', {
							region: 'north',
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 3,
							items: [
								{
									xtype: 'fieldset',
									layout: 'border',
									region:'north',
									height: 150,
									title: 'Экзамены автошколы',
									items: [
										examSchoolGrid
									]
								}
							]
						}),
						Ext.create('Ext.form.Panel', {
							region: 'north',
							bodyCls: 'alt-background',
							border: false,
							bodyPadding: 3,
							items: [
								{
									xtype: 'fieldset',
									layout: 'border',
									region:'north',
									height: 150,
									title: 'Экзамены ГИБДД',
									items: [
										examGibddGrid
									]
								}
							]
						})
					]
				});

				var studentTabPanel = Ext.create('Ext.tab.Panel', {
					id: 'studentTabPanel',
					region: 'center',
					border: false,
					items: [
						studentInfoTab,
						studentDocTab,
						studentPayTab,
						studentExamTab
					]
				});

                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 3,
                    bodyCls: 'alt-background',
                    items: [
                        studentTabPanel
                    ]
                });
				
				function addAccrual(callback) {
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
                            url: 'AS_student_accrual_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
								student_operation_id: student.data.id,
								payment_type_id: -1,
								value:0,
								user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }
				
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
								student_operation_id: student.data.id,
								given_student_operation_id: -1,
								staff_id: -1,
								user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }
				
				function addGivenDocument(callback) {
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
								given_student_operation_id: student.data.id,
								staff_id: -1,
								user_id: sessvars.userId
                            }
                        });
                    }

                    save();

                }
				
				function addGroupStaffVehicle(callback) {
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
                            url: 'AS_group_staff_vehicle_edit.php',
                            success: done,
                            failure: fail,
                            params: {
                                id: -1,
								group_id: group.data.id,
                                staff_id: -1,
                                vehicle_id: -1,
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
                            url: 'AS_student_delete.php',
                            success: done,
                            params: {
                                id: id,
                                hard_delete: 1,
                                user_id: sessvars.userId
                            }
                        });
                    }
                }
				
				
				
				function loadAccrualsFromProgram(student_id, price_id, learning_program_id, callback) {
					
					var lProgramsStore = Ext.create('Ext.data.Store', {
						model: 'LProgramsModel',
						proxy: {
							type: 'jsonp',
							url: 'AS_lprograms_list.php',
							extraParams: {id: id},
							simpleSortMode: true,
							reader: {
								root: 'list',
								totalProperty: 'total'
							}
						},
						remoteSort: true,
						pageSize: 1000000000,
						sorters: [{
							property: 'name_full',
							direction: 'ASC'
						}]
					});
					
					lProgramsStore.getProxy().extraParams = {id: learning_program_id};
					lProgramsStore.load({
						callback: function (records, operation, success) {
							var program = lProgramsStore.getById(learning_program_id);
							if(program){
								Ext.MessageBox.confirm('Подтверждение', 'Добавить начисления из программы "' + program.data.name_full + '"?', function (btn) {
									if (btn == 'yes') {
										function fail(result, request) {
											formPanel.body.unmask();
											Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
										}
										function done(result, request) {
											formPanel.body.unmask();
											if (result.responseText == 'ok') {
												if (callback) {
													callback()
												}
											} else {
												Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
											}

										}
										
										Ext.Ajax.request({
											url: 'AS_student_load_accruals_from_program.php',
											success: done,
											failure: fail,
											params: {
												student_id: student_id,
												price: price_id,
												user_id: sessvars.userId
											}
										});
									}
								})
							}
						}
					})
					
					
				}
				
				function studentSearch(firstname, middlename, lastname, callback) {
					var selectedSearchStudentId = -1;

					var studentsStore = Ext.create('Ext.data.Store', {
						model: 'StudentsModel',
						proxy: {
							type: 'jsonp',
							url: 'AS_students_list.php',
							extraParams: {firstname: firstname,middlename: middlename,lastname: lastname},
							simpleSortMode: true,
							reader: {
								root: 'list',
								totalProperty: 'total'
							}
						},
						pageSize: 20,
					});
					studentsStore.load();

					var firstnameField = Ext.create('Ext.form.field.Text', {
						fieldLabel: 'имя',
						margin: '3 3 3 3',
						value: firstname
					});

					var middlenameField = Ext.create('Ext.form.field.Text', {
						fieldLabel: 'отчество',
						margin: '3 3 3 3',
						value: middlename
					});

					var lastnameField = Ext.create('Ext.form.field.Text', {
						fieldLabel: 'фамилия',
						margin: '3 3 3 3',
						value: lastname
					});

					var bSearch = Ext.create('Ext.Button', {
						text: 'Поиск',
						margin: '0 5 5 5',
						handler: function () {
							studentsStore.getProxy().extraParams = {firstname: firstnameField.getValue(), middlename: middlenameField.getValue(), lastname: lastnameField.getValue()};
							studentsStore.load();
						}
					});

					var searchStudentsGrid = Ext.create('Ext.grid.Panel', {
						store: studentsStore,
						region:'center',
						disableSelection: false,
						rowLines: true,
						columnLines: true,
						columns: [{
								dataIndex: 'lastname',
								text: 'фамилия',
								flex: 2,
								sortable: true
							}, {
								dataIndex: 'firstname',
								text: 'имя',
								flex: 2,
								sortable: true
							}, {
								dataIndex: 'middlename',
								text: 'отчество',
								flex: 2,
								sortable: true
							}, {
								dataIndex: 'birthdate',
								text: 'д.р.',
								renderer: Ext.util.Format.dateRenderer('d.m.Y'),
								flex: 2,
								sortable: false
							}, {
								dataIndex: 'birthplace',
								text: 'место рождения',
								flex: 2,
								sortable: false
							}
						],
						bbar: Ext.create('Ext.PagingToolbar', {
							store: studentsStore,
							displayInfo: true,
							displayMsg: '{0} - {1} из {2}',
							emptyMsg: 'Список пуст'
						}),
						listeners: {
							itemclick: function (view, record) {
								if (record) {
									selectedSearchStudentId = record.data.id;
								}
							},
							itemdblclick: function (view, record) {
								if (record) {
									selectedSearchStudentId = record.data.id;
									if (callback) {
										callback(selectedSearchStudentId)
									}
									win.close();
								}
							}
						}
					});


					var fieldsPanel = Ext.create('Ext.form.Panel', {
						border: false,
						bodyPadding: 3,
						region: 'north',
						layout: 'border',
						bodyCls: 'alt-background',
						fieldDefaults: {
							labelAlign: 'left',
							labelWidth: 150,
							anchor: '100%'
						},
						items: [
							Ext.create('Ext.form.Panel', {
								region: 'north',
								bodyCls: 'alt-background',
								border: false,
								bodyPadding: 3,
								items: [
									lastnameField,
									firstnameField,
									middlenameField,
									bSearch
								]
							}),
							searchStudentsGrid
						]
					});


					var win = new Ext.Window({
						title: 'Поиск студента.',
						layout: 'fit',
						resizable: true,
						modal: true,
						height: 400,
						width: 600,
						items: [
							fieldsPanel
						],
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
										if (callback) {
											callback(selectedSearchStudentId)
										}
										win.close();
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
										if (callback) {
											callback(-1)
										}
										win.close();
									}
								}
							}
						]
					}).show();

					
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
                        url: 'AS_student_edit.php',
                        success: done,
                        failure: fail,
                        params: {
							id: id,
							student_id: studentId,
							firstname: firstnameField.getValue(),
							middlename: middlenameField.getValue(),
							lastname: lastnameField.getValue(),
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
							phone_home: phoneHomeField.getValue(),
							phone_cell: phoneCellField.getValue(),
							phone_work: phoneWorkField.getValue(),
							work_place: workPlaceField.getValue(),
							post_name: postField.getValue(),
							inn: innField.getValue(),
							staff_id: staffCombo.getValue(),
							learning_program_id: student.data.learning_program_id,
							learning_group_id: student.data.learning_group_id,
							price: (student.data.learning_program_type == 0)?student.data.price_id:lProgramPricesCombo.getValue(),
							school_unit_id: (student.data.learning_program_type == 0)?student.data.school_unit_id:schoolUnitsCombo.getValue(),
							number_in_group: student.data.number_in_group,
							card_number: (student.data.learning_program_type == 0)?student.data.card_number:cardNumberField.getValue(),
							category: categoryField.getValue(),
							date_start: startDateField.getValue(),
							date_end: endDateField.getValue(),
							group_reg: groupRegCombo.getValue(),
							status_id: statusesCombo.getValue(),
							expulsion_order_number: expulsionOrderNumberField.getValue(),
							expulsion_date: expulsionDateField.getValue(),
							expulsion_reason_id: expulsionReasonsCombo.getValue(),
							gearbox: gearboxCombo.getValue(),
							comment: commentField.getValue(),
							user_id: sessvars.userId
                        }
                    });
                }
				
				function loadDisciplineFromProgram(group_id, learning_program_id, callback) {	
					var lProgramsStore = Ext.create('Ext.data.Store', {
						model: 'LProgramsModel',
						proxy: {
							type: 'jsonp',
							url: 'AS_lprograms_list.php',
							extraParams: {start_id: -1, active_only: 1, learning_program_type: 0},
							simpleSortMode: true,
							reader: {
								root: 'list',
								totalProperty: 'total'
							}
						},
						remoteSort: true,
						pageSize: 1000000000,
						sorters: [{
							property: 'name_full',
							direction: 'ASC'
						}]
					});

					lProgramsStore.getProxy().extraParams = {id: learning_program_id};
					lProgramsStore.load({
						callback: function (records, operation, success) {
            
							var program = lProgramsStore.getById(learning_program_id);
							if (program){
								function fail(result, request) {
									Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
								}

								function done(result, request) {
									if (result.responseText == 'ok') {
										if (callback) {
											callback()
										}

									} else {
										Ext.Msg.alert('Ошибка', 'При удалении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
									}

								}
								
								Ext.MessageBox.confirm('Подтверждение', 'Добавить список дисциплин из программы "' + program.data.name_full + '"?', function (btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
											url: 'AS_lgroup_load_disc_from_program.php',
											success: done,
											failure: fail,
											params: {
												group_id: group_id,
												learning_program_id: learning_program_id,
												user_id: sessvars.userId
											}
										});
									} else {
										if (callback) {
											callback();
										}
									}
								});
							}
						}
					})
				}

                var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новый студент' : 'Редактирование студента',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    height: 610,
                    width: 1000,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
							disabled: !checkUserRole('FL_CARD_E'),
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