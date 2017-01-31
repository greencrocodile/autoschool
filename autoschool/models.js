function initDataModels() {
    Ext.define("DocumentTypesModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            'name',
            {name: 'parent_id', type: 'int'},
            'parent_name'
        ],
        idProperty: 'id'
    });

    Ext.define("PaymentTypesModel", {
        extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_payment_types_list.php',
			// extraParams: {start_id: -1, parent_id: -1},
			// reader: {
				// type: 'json',
				// root: 'list'
			// },
			// simpleSortMode: true
		// },
        fields: [
            {name: 'id', type: 'int'},
            'name',
            {name: 'parent_id', type: 'int'},
            'parent_name'
        ],
        idProperty: 'id'
    });

    Ext.define('DocumentsModel', {
        extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_documents_list.php',
			// extraParams: {vehicle_id: -1, student_operation_id: -1, given_student_operation_id: -1, staff_id: -1},
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// },
			// simpleSortMode: true
		// },
        fields: [
            {name: 'id', type: 'int'},
            {name: 'vehicle_id', type: 'int'},
            {name: 'staff_id', type: 'int'},
            {name: 'student_operation_id', type: 'int'},
            {name: 'given_student_operation_id', type: 'int'},
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

    Ext.define('VehiclesModel', {
        extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_vehicles_list.php',
			// extraParams: {start_id: 0, active_only: 0},
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// },
			// simpleSortMode: true
		// },
        fields: [
            {name: 'id', type: 'int'},
            'model_name',
            'reg_number',
            {name: 'year', type: 'int'},
            'vin',
            'color_name',
            {name: 'staff_id', type: 'int'},
            {name: 'active', type: 'int'},
            'vehicle_name'
        ],
        idProperty: 'id'
    });

    Ext.define('StaffModel', {
        extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_staff_list.php',
			// extraParams: {start_id: 0, active_only: 0, id: 0},
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// },
			// simpleSortMode: true
		// },
        fields: [
            {name: 'id', type: 'int'},
            'firstname',
            'middlename',
            'lastname',
            'full_name',
            'initials_name',
            'post_name',
            {name: 'birthdate', type: 'date'},
            'birthplace',
            {name: 'gender_id', type: 'int'},
            'gender_name',
            'addr_index',
            {name: 'addr_region', type: 'int'},
            'addr_region_name',
            {name: 'addr_district', type: 'int'},
            'addr_district_name',
            'addr_city',
            'addr_street',
            'addr_house',
            'addr_build',
            'addr_flat',
            {name: 'education_id', type: 'int'},
            'education_name',
            'comment',
            'inn',
            'snils',
            'phone_work',
            'phone_home',
            {name: 'active', type: 'int'}
        ],
        idProperty: 'id'
    });

    Ext.define('LProgramsModel', {
        extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_lprograms_list.php',
			// extraParams: {start_id: 0, active_only: 0, id: 0,learning_program_type: 0},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
        fields: [
            {name: 'id', type: 'int'},
            'name_short',
            'name_full',
            'learning_program_type',
            'learning_program_type_name',
            'category',
            {name: 'days', type: 'int'},
            {name: 'drive_lessons', type: 'int'},
            'drive_lessons_length',
            {name: 'drive_lessons_price', type: 'float'},
            {name: 'active', type: 'int'}
        ],
        idProperty: 'id'
    });

    Ext.define('LProgramDisciplinesModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'learning_program_id', type: 'int'},
            {name: 'learning_discipline_id', type: 'int'},
            'learning_discipline_name',
            {name: 'hours', type: 'int'}
        ],
        idProperty: 'id'
    });

    Ext.define('LProgramPriceHistoryModel', {
        extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_lprogram_price_history_list.php',
			// extraParams: {learning_program_id: 0, id: 0},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
        fields: [
            {name: 'id', type: 'int'},
            {name: 'learning_program_id', type: 'int'},
            'price',
            {name: 'date_begin', type: 'date'}
        ],
        idProperty: 'id'
    });

    Ext.define('LProgramPriceHistoryPaymentsModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'history_id', type: 'int'},
            {name: 'required', type: 'int'},
            {name: 'price_part_id', type: 'int'},
            'price_part_name',
            {name: 'value', type: 'float'}
        ],
        idProperty: 'id'
    });


    Ext.define("LDisciplinesModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            'name',
            'full_name',
            {name: 'parent_id', type: 'int'},
            'parent_name'
        ]
    });

    Ext.define('StaffDisciplinesModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'staff_id', type: 'int'},
            {name: 'learning_discipline_id', type: 'int'},
            'learning_discipline_name',
            {name: 'date_start', type: 'date'},
            {name: 'date_certification', type: 'date'}
        ],
        idProperty: 'id'
    });

    Ext.define("EducationsModel", {
        extend: 'Ext.data.Model',
		 // proxy: {
			// type: 'jsonp',
			// url: 'AS_educations_list.php',
			// extraParams: {start_id: -1},
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// },
			// simpleSortMode: true
		// },
        fields: [
            {name: 'id', type: 'int'},
            'name'
        ],
        idProperty: 'id'
    });
	
	Ext.define("StatusesModel", {
        extend: 'Ext.data.Model',
		 // proxy: {
			// type: 'jsonp',
			// url: 'AS_statuses_list.php',
			// extraParams: {start_id: -1},
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
				// },
			// simpleSortMode: true
		// },
        fields: [
            {name: 'id', type: 'int'},
            'name'
        ],
        idProperty: 'id'
    });
	
	Ext.define("ExpulsionReasonsModel", {
        extend: 'Ext.data.Model',
		 // proxy: {
			// type: 'jsonp',
			// url: 'AS_expulsion_reasons_list.php',
			// extraParams: {start_id: -1},
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// },
			// simpleSortMode: true
		// },
        fields: [
            {name: 'id', type: 'int'},
            'name'
        ],
        idProperty: 'id'
    });
	
	Ext.define("GroupRegModel", {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'id', type: 'int'},
			'name'
		],
        idProperty: 'id'
	});
	
	Ext.define("GearboxModel", {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'id', type: 'int'},
			'name'
		],
        idProperty: 'id'
	});

    Ext.define("StaffSalaryArticlesInModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'staff_id', type: 'int'},
            {name: 'article_id_in', type: 'int'},
            'article_name_in',
            {name: 'article_id_out', type: 'int'},
            'article_name_out',
            {name: 'value', type: 'float'},
            {name: 'amount', type: 'int'},
            {name: 'coefficient', type: 'float'}
        ],
        idProperty: 'id'
    });

    Ext.define("StaffSalaryArticlesOutModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'staff_id', type: 'int'},
            {name: 'article_id_in', type: 'int'},
            'article_name_in',
            {name: 'article_id_out', type: 'int'},
            'article_name_out',
            {name: 'value', type: 'float'},
            {name: 'amount', type: 'int'},
            {name: 'coefficient', type: 'float'}
        ],
        idProperty: 'id'
    });

    Ext.define("StaffOperationsInModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'staff_id', type: 'int'},
            {name: 'operation_date', type: 'date'},
            {name: 'article_id_in', type: 'int'},
            'article_name_in',
            {name: 'article_id_out', type: 'int'},
            'article_name_out',
            {name: 'value', type: 'float'},
            'comment'
        ],
        idProperty: 'id'
    });

    Ext.define("StaffOperationsOutModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'staff_id', type: 'int'},
            {name: 'operation_date', type: 'date'},
            {name: 'article_id_in', type: 'int'},
            'article_name_in',
            {name: 'article_id_out', type: 'int'},
            'article_name_out',
            {name: 'value', type: 'float'},
            'comment'
        ],
        idProperty: 'id'
    });

    Ext.define("RegionsModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            'name'
        ],
        idProperty: 'id'
    });

    Ext.define("DistrictsModel", {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            'name'
        ],
        idProperty: 'id'
    });

    Ext.define("ArticlesModel", {
        extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_articles_list.php',
			// extraParams: {start_id: -1, type: article_type, without_student_payments: 1},
			// reader: {
				// type: 'json',
				// root: 'list'
			// }
		// },
        fields: [
            {name: 'id', type: 'int'},
            'name',
            {name: 'mode', type: 'int'},
            {name: 'article_type', type: 'int'},
            {name: 'staff_name_as_comment', type: 'int'}
        ],
        idProperty: 'id'
    });
	
	Ext.define('DDSModel', {
		extend: 'Ext.data.Model',
		fields: [
			'payment_date',
			{name: 'in_value', type: 'float'},
			{name: 'out_value', type: 'float'},
			{name: 'saldo', type: 'float'}
		],
		idProperty: 'payment_date'
	});
	
	Ext.define('DDSArticlesModel', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'id', type: 'int'},
			{name: 'payment_date', type: 'date'},
			'article_name',
			'comment',
			{name: 'in_value', type: 'float'},
			{name: 'out_value', type: 'float'},
			{name: 'act_date', type: 'date'},
			'act_name',
			'school_unit_name_short'
		],
		idProperty: 'id'
	});

	
	Ext.define('SchoolUnitsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_school_units_list.php',
			// extraParams: {start_id: -1, active_only: 1, whole_as: 1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name:'id', type: 'int'},
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
			{name:'license_date_start', type: 'date'},
			{name:'license_date_end', type: 'date'},
			'reg_number',
			{name:'reg_date', type: 'date'},
			'gibdd_license_number',
			{name:'gibdd_license_date_start', type: 'date'},
			{name:'gibdd_license_date_end', type: 'date'},
			'rent_contract_number',
			{name:'rent_contract_date_start', type: 'date'},
			{name:'rent_contract_date_end', type: 'date'},
			'ground_rent_contract_number',
			{name:'ground_rent_contract_date_start', type: 'date'},
			{name:'ground_rent_contract_date_end', type: 'date'},
			{name:'head_id', type: 'int'},
			'head_name',
			{name:'is_main', type: 'int'},
			'is_main_text',
			{name:'active', type: 'int'}
		],
		idProperty: 'id'
	});
	
	Ext.define('SalaryModel', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'staff_id', type: 'int'},
			{name: 'salary_month', type: 'int'},
			{name: 'salary_year', type: 'int'},
			'salary_month_name',
			'post_name',
			'staff_initials_name',
			{name: 'salary', type: 'float'},
			{name: 'keeping', type: 'float'},
			{name: 'for_pay', type: 'float'}
		],
		idProperty: 'staff_id'
	});
	
	 Ext.define("MonthsModel", {
		extend: 'Ext.data.Model',
		fields: [
			'id',
			'name'
		]
	});
	
	Ext.define('SalaryDetailsInModel', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'id', type: 'int'},
			{name: 'staff_id', type: 'int'},
			{name: 'salary_month', type: 'int'},
			{name: 'salary_year', type: 'int'},
			{name: 'learning_program_id', type: 'int'},
			'learning_program_name_short',
			{name: 'article_id', type: 'int'},
			'article_name',
			{name: 'amount', type: 'int'},
			{name: 'coefficient', type: 'float'},
			{name: 'value', type: 'float'},
			{name: 'total', type: 'float'}
		],
		idProperty: 'id'
	});

	Ext.define('SalaryDetailsOutModel', {
		extend: 'Ext.data.Model',
		proxy: {
			type: 'jsonp',
			url: 'AS_staff_salary_details_out_list.php',
			simpleSortMode: true,
			extraParams: {staff_id: -1,salary_month: -1,salary_year: -1},
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
		fields: [
			{name: 'id', type: 'int'},
			{name: 'staff_id', type: 'int'},
			{name: 'salary_month', type: 'int'},
			{name: 'salary_year', type: 'int'},
			{name: 'article_id', type: 'int'},
			'article_name',
			{name: 'amount', type: 'int'},
			{name: 'coefficient', type: 'float'},
			{name: 'value', type: 'float'},
			{name: 'total', type: 'float'}
		],
		idProperty: 'id'
	});

	Ext.define('LGroupsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_lgroups_list.php',
			// extraParams: {active_only: 1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'number',
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_short',
			{name: 'date_start', type: 'date'},
			{name: 'date_end', type: 'date'},
			{name: 'learning_program_id', type: 'int'},
			'learning_program_name_full',
			'learning_program_name_short',
			{name: 'theory_exam_date', type: 'date'},
			{name: 'practice_exam_date', type: 'date'},
			{name: 'gibdd_exam_date', type: 'date'},
			'reg_order_number',
			{name: 'reg_order_date', type: 'date'},
			{name: 'gibdd_reg_staff_id', type: 'int'},
			'gibdd_reg_staff_name',
			'gibdd_reg_number',
			{name: 'gibdd_reg_date', type: 'date'},
			{name: 'price_id', type: 'int'},
			{name: 'price', type: 'float'},
			{name: 'active', type: 'int'},
			{name: 'confirmed',type: 'int'}
		],
		idProperty: 'id'
	});
	
	Ext.define('GroupStaffDisciplinesModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_group_staff_disciplines_list.php',
			// extraParams: {group_id: -1, id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'learning_group_id', type: 'int'},
			{name: 'staff_id', type: 'int'},
			'staff_name',
			{name: 'learning_discipline_id', type: 'int'},
			'learning_discipline_name'
		],
		idProperty: 'id'
	});
	
	Ext.define('GroupStaffVehiclesModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_group_staff_vehicles_list.php',
			// extraParams: {group_id: -1, id : -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'staff_id', type: 'int'},
			'staff_name',
			{name: 'vehicle_id', type: 'int'},
			'vehicle_name',
			{name: 'learning_group_id', type: 'int'}
		],
		idProperty: 'id'
	});
	
	Ext.define('StudentsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_students_list.php',
			// extraParams: {id: -1,firstname: '',middlename: '',lastname: ''},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'firstname',
			'middlename',
			'lastname',
			{name: 'birthdate', type: 'date'},
			'birthplace',
			{name: 'gender_id', type: 'int'},
			'gender_name',
			'addr_index',
			{name: 'addr_region', type: 'int'},
			{name: 'addr_district', type: 'int'},
			'addr_city',
			'addr_street',
			'addr_house',
			'addr_build',
			'addr_flat',
			{name: 'education_id', type: 'int'},
			'phone_home',
			'phone_cell',
			'phone_work',
			'work_place',
			'post_name',
			'inn'
		],
		idProperty: 'id'
	});

	Ext.define('StudentsOperationsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_students_operations_list.php',
			// extraParams: {id: -1, start_id: -1, learning_group_id: -1, learning_program_id: -1, active_only: 1, sort_by_numbers: 1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'student_id', type: 'int'},
			'firstname',
			'middlename',
			'lastname',
			'full_name',
			'initials_name',
			'full_name_with_group',
			{name: 'birthdate', type: 'date'},
			'birthplace',
			{name: 'gender_id', type: 'int'},
			'gender_name',
			'addr_index',
			{name: 'addr_region', type: 'int'},
			{name: 'addr_district', type: 'int'},
			'addr_city',
			'addr_street',
			'addr_house',
			'addr_build',
			'addr_flat',
			{name: 'education_id', type: 'int'},
			'education_name',
			'phone_home',
			'phone_cell',
			'phone_work',
			'work_place',
			'post_name',
			'inn',
			{name: 'staff_id', type: 'int'},
			'staff_name',
			{name: 'learning_program_id', type: 'int'},
			{name: 'learning_program_type', type: 'int'},
			'learning_program_name_full',
			'learning_program_name_short',
			{name: 'learning_group_id', type: 'int'},
			'learning_group_number',
			{name: 'price_id', type: 'int'},
			'price',
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_short',
			'school_unit_name_full',
			'number_in_group',
			'card_number',
			'category',
			{name: 'date_start', type: 'date'},
			{name: 'date_end', type: 'date'},
			{name: 'group_reg', type: 'int'},
			'group_reg_name',
			{name: 'status_id', type: 'int'},
			'status_name',
			'expulsion_order_number',
			{name: 'expulsion_date', type: 'date'},
			{name: 'expulsion_reason_id', type: 'int'},
			'expulsion_reason_name',
			{name: 'gearbox', type: 'int'},
			'gearbox_name',
			'comment',
			{name: 'active', type: 'int'}
		],
		idProperty: 'id'
	});
	
	Ext.define('VariablesModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_variables_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list'
			// }
		// },
		fields: [
			'name',
			'value'
		],
		idProperty: 'name'
	});
	
	Ext.define("StudentAccrualsModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_accruals_list.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'student_operation_id', type: 'int'},
			{name: 'payment_type_id', type: 'int'},
			'payment_type_name',
			{name: 'value', type: 'float'}
		],
		idProperty: 'id'
	});

	Ext.define("StudentPaymentsModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_payments_list.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'student_id', type: 'int'},
			{name: 'payment_type_id', type: 'int'},
			'payment_type_name',
			{name: 'payment_date', type: 'date'},
			{name: 'value', type: 'float'},
			'school_unit_name_short'
		],
		idProperty: 'id'
	});

	Ext.define("StudentTotalAccrualsModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_total_accruals.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list'
			// }
		// },
		fields: [
			{name: 'student_operation_id', type: 'int'},
			{name: 'total_accruals', type: 'float'}
		],
		idProperty: 'student_operation_id'
	});

	Ext.define("StudentTotalPaymentsModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_total_payments.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list'
			// }
		// },
		fields: [
			{name: 'student_operation_id', type: 'int'},
			{name: 'total_payments', type: 'float'}
		],
		idProperty: 'student_operation_id'
	});

	Ext.define("StudentSaldoModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_saldo.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list'
			// }
		// },
		fields: [
			{name: 'student_operation_id', type: 'int'},
			{name: 'saldo', type: 'float'}
		],
		idProperty: 'student_operation_id'
	});

	Ext.define("DriveLessonsModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_drive_lessons_list.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'number',
			{name: 'date', type: 'date'},
			'model_name',
			'reg_number',
			'place',
			'staff_initials_name'
		],
		idProperty: 'id'
	});
	
	Ext.define("StudentsDriveLessonsCountModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_drive_lessons_count_list.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'student_operation_id', type: 'int'},
			{name: 'drive_lessons_total', type: 'int'},
			{name: 'drive_lessons_program', type: 'int'},
			{name: 'drive_lessons_city', type: 'int'},
			{name: 'drive_lessons_polygon', type: 'int'},
			{name: 'drive_lessons_add', type: 'int'}
		],
		idProperty: 'student_operation_id'
	});
	
	Ext.define("DriveLessonsCountModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_drive_lessons_count_list.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'waybills_count', type: 'int'},
			{name: 'drive_lessons_total', type: 'int'},
			{name: 'drive_lessons_program', type: 'int'},
			{name: 'drive_lessons_city', type: 'int'},
			{name: 'drive_lessons_polygon', type: 'int'},
			{name: 'drive_lessons_add', type: 'int'}
		]
	});


	Ext.define('StudentTestsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_tests_list.php',
			// extraParams: {id: -1, student_operation_id: -1, test_date: '', test_type_id: -1,staff_id: -1,group_number: ''},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name:'id',type: 'int'},
			{name:'student_operation_id',type: 'int'},
			'full_name_with_group',
			'school_unit_name_short',
			{name: 'exam_date', type: 'date'},
			{name: 'type_id', type: 'int'},
			'type_name',
			'category',
			{name: 'result_id', type: 'int'},
			'result_name',
			{name: 'motive_id', type: 'int'},
			'motive_name'
		],
		idProperty: 'id'
	});
	
	Ext.define('StudentGibddExamsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_gibdd_exams_list.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id',type: 'int'},
			{name: 'student_operation_id',type: 'int'},
			{name: 'exam_date', type: 'date'},
			{name: 'type_id', type: 'int'},
			'type_name',
			'category',
			{name: 'result_id', type: 'int'},
			'result_name',
			{name: 'motive_id', type: 'int'},
			'motive_name'
		],
		idProperty: 'id'
	});
	
	Ext.define('StudentSchoolExamsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_school_exams_list.php',
			// extraParams: {student_operation_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id',type: 'int'},
			{name: 'student_operation_id',type: 'int'},
			{name: 'exam_date', type: 'date'},
			{name: 'type_id', type: 'int'},
			'type_name',
			'category',
			{name: 'result',type: 'int'}
		],
		idProperty: 'id'
	});
	
	 Ext.define('PaymentsInModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_payments_list.php',
			// extraParams: {payment_date: '', school_unit_id: -1, article_type: 1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'staff_id', type: 'int'},
			'payment_date',
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_short',
			{name: 'article_id', type: 'int'},
			{name: 'article_type', type: 'int'},
			'article_name',
			{name: 'value', type: 'float'},
			'comment'
		],
		idProperty: 'id'
	});

	Ext.define('PaymentsOutModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_payments_list.php',
			// extraParams: {payment_date: '', school_unit_id: -1, article_type: 0},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'staff_id', type: 'int'},
			'payment_date',
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_short',
			{name: 'article_id', type: 'int'},
			{name: 'article_type', type: 'int'},
			'article_name',
			{name: 'value', type: 'float'},
			'comment'
		],
		idProperty: 'id'
	});

	Ext.define('SchoolExamGroupsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_exam_groups_school_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'number',
			{name: 'learning_group_id', type: 'int'},
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_full',
			'school_unit_name_short',
			{name: 'exam_date', type: 'date'},
			'protocol_number',
			{name: 'protocol_date', type: 'date'},
			{name: 'gibdd_reg_staff_id', type: 'int'},
			'gibdd_reg_staff_initials_name',
			{name: 'gibdd_reg_date', type: 'date'}
		],
		idProperty: 'id'
	});
	
	Ext.define('GibddExamGroupsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_exam_groups_gibdd_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'number',
			{name: 'learning_group_id', type: 'int'},
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_full',
			'school_unit_name_short',
			{name: 'exam_date', type: 'date'},
			'protocol_number',
			{name: 'protocol_date', type: 'date'},
			{name: 'gibdd_reg_staff_id', type: 'int'},
			'gibdd_reg_staff_initials_name',
			{name: 'gibdd_reg_date', type: 'date'}
		],
		idProperty: 'id'
	});
	
	Ext.define('SchoolExamGroupResultsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_exam_group_school_results_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'exam_group_id', type: 'int'},
			{name: 'student_operation_id', type: 'int'},
			'student_number',
			{name: 'number', type: 'int'},
			'student_full_name',
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_short',
			{name: 'theory_exam_id', type: 'int'},
			{name: 'theory_result_id', type: 'int'},
			'theory_result',
			{name: 'theory_motive_id', type: 'int'},
			{name: 'city_exam_id', type: 'int'},
			{name: 'city_result_id', type: 'int'},
			'city_result',
			{name: 'city_motive_id', type: 'int'},
			{name: 'cert_id', type: 'int'},
			'cert_number'
		],
		idProperty: 'id'
	});
	
	Ext.define('GibddExamGroupResultsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_exam_group_gibdd_results_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'exam_group_id', type: 'int'},
			{name: 'student_operation_id', type: 'int'},
			'student_number',
			{name: 'number', type: 'int'},
			'student_full_name',
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_short',
			{name: 'theory_exam_id', type: 'int'},
			{name: 'theory_result_id', type: 'int'},
			'theory_result',
			{name: 'theory_motive_id', type: 'int'},
			{name: 'polygon_exam_id', type: 'int'},
			{name: 'polygon_result_id', type: 'int'},
			'polygon_result',
			{name: 'polygon_motive_id', type: 'int'},
			{name: 'city_exam_id', type: 'int'},
			{name: 'city_result_id', type: 'int'},
			'city_result',
			{name: 'city_motive_id', type: 'int'},
			{name: 'cert_id', type: 'int'},
			'cert_number'
		],
		idProperty: 'id'
	});
	
	Ext.define('ExamMotivesModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_exam_motives_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'name'
		],
		idProperty: 'id'
	});
	
	Ext.define('ExamTypesModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_exam_types_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'parent_id', type: 'int'},
			'name'
		],
		idProperty: 'id'
	});
	
	Ext.define("TheoryResultsModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_exam_results_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			'id',
			'name'
		],
		idProperty: 'id'
	});

	Ext.define("CityResultsModel", {
		extend: 'Ext.data.Model',
		fields: [
			'id',
			'name'
		],
		idProperty: 'id'
	});
	
	Ext.define("PolygonResultsModel", {
		extend: 'Ext.data.Model',
		fields: [
			'id',
			'name'
		],
		idProperty: 'id'
	});
	
	Ext.define('StudentOperationsStaffModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_student_operations_staff_list.php',
			// extraParams: {staff_id: -1,learning_group_number: ''},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'staff_id', type: 'int'},
			'full_name_with_group',
			'learning_group_number'
		],
		idProperty: 'id'
	});
	
	Ext.define("StudentCheckExamAllowedModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_check_student_exam_allowed.php',
			// extraParams: {student_operation_id: -1, exam_type_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list'
			// }
		// },
		fields: [
			{name: 'student_operation_id', type: 'int'},
			{name: 'exam_allowed', type: 'int'}
		],
		idProperty: 'student_operation_id'
	});
	
	Ext.define("StudentCheckSuccessExamModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_check_student_success_exam.php',
			// extraParams: {student_operation_id: -1, exam_type_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list'
			// }
		// },
		fields: [
			{name: 'student_operation_id', type: 'int'},
			{name: 'exam_exists', type: 'int'}
		],
		idProperty: 'student_operation_id'
	});
	
	 Ext.define('WaybillsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_waybills_list.php',
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'number',
			{name: 'date', type: 'date'},
			{name: 'odo', type: 'int'},
			{name: 'staff_id', type: 'int'},
			'staff_initials_name',
			{name: 'vehicle_id', type: 'int'},
			'model_name',
			'reg_number',
			'vehicle_name'
		],
		idProperty: 'id'
	});
	
	Ext.define('WaybillStudentsModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_waybill_students_list.php',
			// extraParams: {waybill_id: -1},
			// simpleSortMode: true,
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'waybill_id', type: 'int'},
			{name: 'student_operation_id', type: 'int'},
			'student_full_name',
			'time_text',
			{name: 'place_id', type: 'int'},
			'place',
			{name: 'staff_id', type: 'int'}
		],
		idProperty: 'id'
	});
	
	Ext.define("PlacesModel", {
		extend: 'Ext.data.Model',
		fields: [
			'id',
			'name'
		],
		idProperty: 'id'
	});
	
	Ext.define('UsersModel', {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_users_list.php',
			// simpleSortMode: true,
			// extraParams: {start_id: 0, active_only: 1},
			// reader: {
				// root: 'list',
				// totalProperty: 'total'
			// }
		// },
		fields: [
			{name: 'id', type: 'int'},
			'firstname',
			'middlename',
			'lastname',
			'initials_name',
			'full_name',
			'login',
			{name: 'school_unit_id', type: 'int'},
			'school_unit_name_full',
			'privileges',
			{name: 'active', type: 'int'}
		],
		idProperty: 'id'
	});
	
	Ext.define("DictionariesModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_dicts_list.php',
			// reader: {
				// type: 'json',
				// root: 'list'
			// },
			// pageSize: 0
		// },
		fields: [
			{name: 'id', type: 'int'},
			'name',
			'table_name',
			{name: 'dict_type', type: 'int'}
		]
	});
	
	Ext.define("SimpleDictionaryModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_simple_dict_list.php',
			// extraParams: {table_name: ''},
			// reader: {
				// type: 'json',
				// root: 'list'
			// },
			// pageSize: 0
		// },
		fields: [
			{name: 'id', type: 'int'},
			{name: 'parent_id', type: 'int'},
			'name'
		]
	});
	
	Ext.define("DocumentsExportModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_documents_export_list.php',
			// extraParams: {codes: ''},
			// reader: {
				// type: 'json',
				// root: 'list'
			// },
			// pageSize: 0
		// },
		fields: [
			{name: 'code', type: 'int'},
			'name'
		]
	});
	
	Ext.define("ReportsExportModel", {
		extend: 'Ext.data.Model',
		// proxy: {
			// type: 'jsonp',
			// url: 'AS_reports_export_list.php',
			// extraParams: {codes: ''},
			// reader: {
				// type: 'json',
				// root: 'list'
			// },
			// pageSize: 0
		// },
		fields: [
			{name: 'list_number', type: 'int'},
			'name',
			'file_name'
		]
	});	
}		