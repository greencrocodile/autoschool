function editUser(id, is_new, callback) {
    //**********variables**********
	
	var selectedStudentId = -1;
	var selectedPrivileges = '#';
	var pwd = '';
    //**********stores**********
    var usersStore = Ext.create('Ext.data.Store', {
		model: 'UsersModel',
		proxy: {
			type: 'jsonp',
			url: 'AS_users_list.php',
			simpleSortMode: true,
			extraParams: {start_id: 0, active_only: 1},
			reader: {
				root: 'list',
				totalProperty: 'total'
			}
		},
		remoteSort: true,
		pageSize: 1000000000
	});
	
	usersStore.load();

    usersStore.getProxy().extraParams = {id: id};
    usersStore.load({
        callback: function (records, operation, success) {
            var user = usersStore.getById(id);
            if (user) {
				var schoolUnitsStore = Ext.create('Ext.data.Store', {
					model: 'SchoolUnitsModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_school_units_list.php',
						extraParams: {start_id: -1, active_only: 0, whole_as: 0},
						simpleSortMode: true,
						reader: {
							root: 'list',
							totalProperty: 'total'
						}
					},
					listeners: {
						load: function(){
							schoolUnitsCombo.setValue(user.data.school_unit_id);
						}
					}
				});
				schoolUnitsStore.load();
		
				var firstnameField = Ext.create('Ext.form.field.Text', {
					margin: '3 3 3 3',
					fieldLabel: 'Имя'					
				});

				var middlenameField = Ext.create('Ext.form.field.Text', {
					margin: '3 3 3 3',
					fieldLabel: 'Отчество'
				});

				var lastnameField = Ext.create('Ext.form.field.Text', {
					margin: '3 3 3 3',
					fieldLabel: 'Фамилия'
				});

				var loginField = Ext.create('Ext.form.field.Text', {
					margin: '3 3 3 3',
					fieldLabel: 'Логин'
				});

				var pwdField = Ext.create('Ext.form.field.Text', {
					margin: '3 3 3 3',
					inputType: 'password',
					fieldLabel: 'Пароль'
				});

				var pwdConfirmField = Ext.create('Ext.form.field.Text', {
					margin: '3 3 3 3',
					inputType: 'password',
					fieldLabel: 'подтверждение'
				});

				var schoolUnitsCombo = Ext.create('Ext.form.ComboBox', {
					fieldLabel: 'Подразделение школы',
					store: schoolUnitsStore,
					queryMode: 'local',
					displayField: 'name_full',
					valueField: 'id',
					margin: '3 3 3 3',
					anchor: '100%',
					editable: false
				});
                 //Суточный баланс
				var dayBalanceAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					width: 100,
					labelWidth: 75,
					//margin: '3 3 3 3',
					listeners: {
						change: function(dayBalanceAField,newValue,oldValue){
							
							changeUserPrivilege('DAY_BALANCE_A',newValue);
						}
					}
				});

				var dayBalanceADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dayBalanceADField,newValue,oldValue){
							
							changeUserPrivilege('DAY_BALANCE_AD',newValue);
						}
					}
				});

				var dayBalanceASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dayBalanceASField,newValue,oldValue){
							
							changeUserPrivilege('DAY_BALANCE_AS',newValue);
						}
					}
				});

				var dayBalanceDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dayBalanceDField,newValue,oldValue){
							
							changeUserPrivilege('DAY_BALANCE_D',newValue);
						}
					}
				});

				var dayBalanceEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dayBalanceEField,newValue,oldValue){
							
							changeUserPrivilege('DAY_BALANCE_E',newValue);
						}
					}
				});

				var dayBalanceRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dayBalanceRField,newValue,oldValue){
							
							changeUserPrivilege('DAY_BALANCE_R',newValue);
						}
					}
				});

				//Движение денежных средств
				var ddsASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(ddsASField,newValue,oldValue){
							
							changeUserPrivilege('DDS_AS',newValue);
						}
					}
				});

				var ddsRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(ddsRField,newValue,oldValue){
							
							changeUserPrivilege('DDS_R',newValue);
						}
					}
				});

				//справочники
				var dAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dAField,newValue,oldValue){
							
							changeUserPrivilege('D_A',newValue);
						}
					}
				});

				var dDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dDField,newValue,oldValue){
							
							changeUserPrivilege('D_D',newValue);
						}
					}
				});

				var dEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dEField,newValue,oldValue){
							
							changeUserPrivilege('D_E',newValue);
						}
					}
				});

				var dRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(dRField,newValue,oldValue){
							
							changeUserPrivilege('D_R',newValue);
						}
					}
				});

				//Экзаменационные группы ГИБДД
				var eggAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(eggAField,newValue,oldValue){
							
							changeUserPrivilege('EGG_A',newValue);
						}
					}
				});

				var eggADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(eggADField,newValue,oldValue){
							
							changeUserPrivilege('EGG_AD',newValue);
						}
					}
				});

				var eggASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(eggASField,newValue,oldValue){
							
							changeUserPrivilege('EGG_AS',newValue);
						}
					}
				});

				var eggDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(eggDField,newValue,oldValue){
							
							changeUserPrivilege('EGG_D',newValue);
						}
					}
				});

				var eggEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(eggEField,newValue,oldValue){
							
							changeUserPrivilege('EGG_E',newValue);
						}
					}
				});

				var eggRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(eggRField,newValue,oldValue){
							
							changeUserPrivilege('EGG_R',newValue);
						}
					}
				});

				//Экзаменационные группы АШ
				var egsAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(egsAField,newValue,oldValue){
							
							changeUserPrivilege('EGS_A',newValue);
						}
					}
				});

				var egsADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(egsADField,newValue,oldValue){
							
							changeUserPrivilege('EGS_AD',newValue);
						}
					}
				});

				var egsASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(egsASField,newValue,oldValue){
							
							changeUserPrivilege('EGS_AS',newValue);
						}
					}
				});

				var egsDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(egsDField,newValue,oldValue){
							
							changeUserPrivilege('EGS_D',newValue);
						}
					}
				});

				var egsEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(egsEField,newValue,oldValue){
							
							changeUserPrivilege('EGS_E',newValue);
						}
					}
				});

				var egsRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(egsRField,newValue,oldValue){
							
							changeUserPrivilege('EGS_R',newValue);
						}
					}
				});

				//Карточка ФЛ
				var flCardAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(flCardAField,newValue,oldValue){
							
							changeUserPrivilege('FL_CARD_A',newValue);
						}
					}
				});

				var flCardADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(flCardADField,newValue,oldValue){
							
							changeUserPrivilege('FL_CARD_AD',newValue);
						}
					}
				});

				var flCardASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(flCardASField,newValue,oldValue){
							
							changeUserPrivilege('FL_CARD_AS',newValue);
						}
					}
				});

				var flCardDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(flCardDField,newValue,oldValue){
							
							changeUserPrivilege('FL_CARD_D',newValue);
						}
					}
				});

				var flCardEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(flCardEField,newValue,oldValue){
							
							changeUserPrivilege('FL_CARD_E',newValue);
						}
					}
				});

				var flCardRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(flCardRField,newValue,oldValue){
							
							changeUserPrivilege('FL_CARD_R',newValue);
						}
					}
				});

				//Индивидуальное обучение

				var iRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(iRField,newValue,oldValue){
							
							changeUserPrivilege('I_R',newValue);
						}
					}
				});

				//Учебные группы
				var lgAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lgAField,newValue,oldValue){
							
							changeUserPrivilege('LG_A',newValue);
						}
					}
				});

				var lgADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lgADField,newValue,oldValue){
							
							changeUserPrivilege('LG_AD',newValue);
						}
					}
				});

				var lgASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lgASField,newValue,oldValue){
							
							changeUserPrivilege('LG_AS',newValue);
						}
					}
				});

				var lgDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lgDField,newValue,oldValue){
							
							changeUserPrivilege('LG_D',newValue);
						}
					}
				});

				var lgEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lgEField,newValue,oldValue){
							
							changeUserPrivilege('LG_E',newValue);
						}
					}
				});

				var lgRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lgRField,newValue,oldValue){
							
							changeUserPrivilege('LG_R',newValue);
						}
					}
				});

				//внешние группы
				var ogAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(ogAField,newValue,oldValue){
							
							changeUserPrivilege('OG_A',newValue);
						}
					}
				});

				var ogADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(ogADField,newValue,oldValue){
							
							changeUserPrivilege('OG_AD',newValue);
						}
					}
				});

				var ogDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(ogDField,newValue,oldValue){
							
							changeUserPrivilege('OG_D',newValue);
						}
					}
				});

				var ogEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(ogEField,newValue,oldValue){
							
							changeUserPrivilege('OG_E',newValue);
						}
					}
				});

				var ogRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(ogRField,newValue,oldValue){
							
							changeUserPrivilege('OG_R',newValue);
						}
					}
				});

				//паспорт аш
				var passportEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					// //margin: '3 3 3 3',
					listeners: {
						change: function(passportEField,newValue,oldValue){
							
							changeUserPrivilege('PASSPORT_E',newValue);
						}
					}
				});

				var passportRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					// //margin: '3 3 3 3',
					listeners: {
						change: function(passportRField,newValue,oldValue){
							
							changeUserPrivilege('PASSPORT_R',newValue);
						}
					}
				});

				//зарплата
				var salaryADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(salaryADField,newValue,oldValue){
							
							changeUserPrivilege('SALARY_AD',newValue);
						}
					}
				});

				var salaryEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(salaryEField,newValue,oldValue){
							
							changeUserPrivilege('SALARY_E',newValue);
						}
					}
				});

				var salaryRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(salaryRField,newValue,oldValue){
							
							changeUserPrivilege('SALARY_R',newValue);
						}
					}
				});
				
		//Назначение оплат
				var spaAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spaAField,newValue,oldValue){
							
							changeUserPrivilege('SPA_A',newValue);
						}
					}
				});
				
				var spaADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spaADField,newValue,oldValue){
							
							changeUserPrivilege('SPA_AD',newValue);
						}
					}
				});
				
				var spaDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spaDField,newValue,oldValue){
							
							changeUserPrivilege('SPA_D',newValue);
						}
					}
				});

				var spaEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spaEField,newValue,oldValue){
							
							changeUserPrivilege('SPA_E',newValue);
						}
					}
				});

				var spaRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spaRField,newValue,oldValue){
							
							changeUserPrivilege('SPA_R',newValue);
						}
					}
				});

			//Оплаты обучения
				var spAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spAField,newValue,oldValue){
							
							changeUserPrivilege('SP_A',newValue);
						}
					}
				});

				var spADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spADField,newValue,oldValue){
							
							changeUserPrivilege('SP_AD',newValue);
						}
					}
				});

				var spASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spASField,newValue,oldValue){
							
							changeUserPrivilege('SP_AS',newValue);
						}
					}
				});

				var spDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spDField,newValue,oldValue){
							
							changeUserPrivilege('SP_D',newValue);
						}
					}
				});

				var spEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spEField,newValue,oldValue){
							
							changeUserPrivilege('SP_E',newValue);
						}
					}
				});

				var spRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(spRField,newValue,oldValue){
							
							changeUserPrivilege('SP_R',newValue);
						}
					}
				});

		//ИПС
				var staffAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffAField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_A',newValue);
						}
					}
				});

				var staffDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffDField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_D',newValue);
						}
					}
				});

				var staffEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffEField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_E',newValue);
						}
					}
				});

				var staffRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffRField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_R',newValue);
						}
					}
				});

		//Финансовые операции с ИПС
				var staffOperAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffOperAField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_OPER_A',newValue);
						}
					}
				});

				var staffOperADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffOperADField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_OPER_AD',newValue);
						}
					}
				});

				var staffOperDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffOperDField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_OPER_D',newValue);
						}
					}
				});

				var staffOperEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffOperEField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_OPER_E',newValue);
						}
					}
				});

				var staffOperRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(staffOperRField,newValue,oldValue){
							
							changeUserPrivilege('STAFF_OPER_R',newValue);
						}
					}
				});

		//Выборки
				var sRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(sRField,newValue,oldValue){
							
							changeUserPrivilege('S_R',newValue);
						}
					}
				});

		//Зачёты
				var testsAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(testsAField,newValue,oldValue){
							
							changeUserPrivilege('TESTS_A',newValue);
						}
					}
				});

				var testsADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(testsADField,newValue,oldValue){
							
							changeUserPrivilege('TESTS_AD',newValue);
						}
					}
				});

				var testsDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(testsDField,newValue,oldValue){
							
							changeUserPrivilege('TESTS_D',newValue);
						}
					}
				});

				var testsEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(testsEField,newValue,oldValue){
							
							changeUserPrivilege('TESTS_E',newValue);
						}
					}
				});

				var testsRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(testsRField,newValue,oldValue){
							
							changeUserPrivilege('TESTS_R',newValue);
						}
					}
				});

		//Теоретические занятия
				var tAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(tAField,newValue,oldValue){
							
							changeUserPrivilege('T_A',newValue);
						}
					}
				});

				var tADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(tADField,newValue,oldValue){
							
							changeUserPrivilege('T_AD',newValue);
						}
					}
				});

				var tASField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'по всей АШ',
					//margin: '3 3 3 3',
					listeners: {
						change: function(tASField,newValue,oldValue){
							
							changeUserPrivilege('T_AS',newValue);
						}
					}
				});

				var tDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(tDField,newValue,oldValue){
							
							changeUserPrivilege('T_D',newValue);
						}
					}
				});

				var tEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(tEField,newValue,oldValue){
							
							changeUserPrivilege('T_E',newValue);
						}
					}
				});

				var tRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(tRField,newValue,oldValue){
							
							changeUserPrivilege('T_R',newValue);
						}
					}
				});

		//Пользователи
				var uAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(uAField,newValue,oldValue){
							
							changeUserPrivilege('U_A',newValue);
						}
					}
				});

				var uDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(uDField,newValue,oldValue){
							
							changeUserPrivilege('U_D',newValue);
						}
					}
				});

				var uEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(uEField,newValue,oldValue){
							
							changeUserPrivilege('U_E',newValue);
						}
					}
				});

				var uRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(uRField,newValue,oldValue){
							
							changeUserPrivilege('U_R',newValue);
						}
					}
				});

		//Транспортные средства
				var vehiclesAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(vehiclesAField,newValue,oldValue){
							
							changeUserPrivilege('VEHICLES_A',newValue);
						}
					}
				});

				var vehiclesDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(vehiclesDField,newValue,oldValue){
							
							changeUserPrivilege('VEHICLES_D',newValue);
						}
					}
				});

				var vehiclesEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(vehiclesEField,newValue,oldValue){
							
							changeUserPrivilege('VEHICLES_E',newValue);
						}
					}
				});

				var vehiclesRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(vehiclesRField,newValue,oldValue){
							
							changeUserPrivilege('VEHICLES_R',newValue);
						}
					}
				});

		//Путевые листы
				var wbAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(wbAField,newValue,oldValue){
							
							changeUserPrivilege('WB_A',newValue);
						}
					}
				});

				var wbADField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'за все даты',
					//margin: '3 3 3 3',
					listeners: {
						change: function(wbADField,newValue,oldValue){
							
							changeUserPrivilege('WB_AD',newValue);
						}
					}
				});

				var wbDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(wbDField,newValue,oldValue){
							
							changeUserPrivilege('WB_D',newValue);
						}
					}
				});

				var wbEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(wbEField,newValue,oldValue){
							
							changeUserPrivilege('WB_E',newValue);
						}
					}
				});

				var wbRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(wbRField,newValue,oldValue){
							
							changeUserPrivilege('WB_R',newValue);
						}
					}
				});

				//Программы обучения
				var lpAField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'добавление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lpAField,newValue,oldValue){
							
							changeUserPrivilege('LP_A',newValue);
						}
					}
				});

				var lpDField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'удаление',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lpDField,newValue,oldValue){
							
							changeUserPrivilege('LP_D',newValue);
						}
					}
				});

				var lpEField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'корректура',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lpEField,newValue,oldValue){
							
							changeUserPrivilege('LP_E',newValue);
						}
					}
				});

				var lpRField = Ext.create('Ext.form.field.Checkbox', {
					boxLabel: 'чтение',
					//margin: '3 3 3 3',
					listeners: {
						change: function(lpRField,newValue,oldValue){
							
							changeUserPrivilege('LP_R',newValue);
						}
					}
				});
				selectedPrivileges = user.data.privileges;
				loadUserData();
                //**********panels**********

				
				var editStudentPanel = Ext.create('Ext.panel.Panel', {
					border: false,
					region: 'north',
					bodyCls: 'alt-background',
					items: [
						{
							xtype: 'button',
							text: 'Добавить',
							//margin: '3 3 3 3',
							listeners: {
								click: function () {
									addStudent(function(id){
										if (staffCombo.getValue() == -1) {
											Ext.Msg.alert('Ошибка', 'Не выбран инструктор');
										} else {
											editWaybillStudent(id, 1, staffCombo.getValue(),
												function (id) {
													studentsStore.reload();
												}
											);
										}
									});
								}
							}
						},
						{
							xtype: 'button',
							text: 'Удалить',
							//margin: '3 3 3 3',
							listeners: {
								click: function () {
									deleteWaybillStudent(selectedStudentId,function(){
										studentsStore.reload();
									})
								}
							}
						}
					]
				});
				
				var checkBoxPanel = Ext.create('Ext.form.Panel', {
					// overflowY: true,
					autoScroll: true,
                    bodyCls: 'alt-background',
                    region: 'center',
                    border: false,
                    items: [
 
                                
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Паспорт автошколы&nbsp;</span>'
												},
                                                passportRField,
                                                passportEField
                                            ]
                                        },

                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;ИПС&nbsp;</span>'
												},
                                                staffRField,
                                                staffEField,
                                                staffAField,
                                                staffDField
                                            ]

										}, 
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Транспортные средства&nbsp;</span>'
												},
                                                vehiclesRField,
                                                vehiclesEField,
                                                vehiclesAField,
                                                vehiclesDField
                                            ]
                                        },
										{

                                        
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Зарплата&nbsp;</span>'
												},
                                                
                                                salaryRField,
                                                salaryEField,
                                                salaryADField
                                            ]
                                        }
                                    , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Финансовые операции с ИПС&nbsp;</span>'
												},
                                                staffOperRField,
                                                staffOperEField,
                                                staffOperAField,
                                                staffOperDField,
                                                staffOperADField
                                            ]
                                        }
                                  , {
                                   
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Программы обучения&nbsp;</span>'
												},
                                                lpRField,
                                                lpEField,
                                                lpAField,
                                                lpDField
                                            ]
                                        }
                                    , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Движение денежных средств&nbsp;</span>'
												},
                                                ddsRField,
                                                ddsASField
                                            ]
                                        }
                                    , {
                                    
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Суточный баланс&nbsp;</span>'
												},
                                                dayBalanceRField,
                                                dayBalanceEField,
                                                dayBalanceAField,
                                                dayBalanceDField,
                                                dayBalanceASField,
                                                dayBalanceADField
                                            ]
                                        }
                                    , {
                                   
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Карточка ФЛ&nbsp;</span>'
												},
                                                flCardRField,
                                                flCardEField,
                                                flCardAField,
                                                flCardDField,
                                                flCardASField,
                                                flCardADField
                                            ]
                                        }
                                    ,{
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Учебные группы&nbsp;</span>'
												},
                                                lgRField,
                                                lgEField,
                                                lgAField,
                                                lgDField,
                                                lgASField,
                                                lgADField
                                            ]
                                        }
                                    , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Зачёты&nbsp;</span>'
												},
                                                testsRField,
                                                testsEField,
                                                testsAField,
                                                testsDField
                                            ]
                                        }
                                    , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Экзаменационные группы АШ&nbsp;</span>'
												},
                                                egsRField,
                                                egsEField,
                                                egsAField,
                                                egsDField,
                                                egsASField,
                                                egsADField
                                            ]
                                        }
                                    , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Экзаменационные группы ГИБДД&nbsp;</span>'
												},
                                                eggRField,
                                                eggEField,
                                                eggAField,
                                                eggDField,
                                                eggASField,
                                                eggADField
                                            ]
                                        }
                                   , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Индивидуальное обучение&nbsp;</span>'
												},
                                                iRField
                                            ]
                                        }
                                    , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Путевые листы&nbsp;</span>'
												},
                                                wbRField,
                                                wbEField,
                                                wbAField,
                                                wbDField,
                                                wbADField
                                            ]
                                        }
                                    , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Назначение оплат&nbsp;</span>'
												},
                                                spaRField,
                                                spaEField,
                                                spaAField,
                                                spaDField,
                                                spaADField
                                            ]
                                        }
                                   , {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Оплаты обучения&nbsp;</span>'
												},
                                                spRField,
                                                spEField,
                                                spAField,
                                                spDField,
                                                spASField,
                                                spADField
                                            ]
                                        }
								, {
                                    
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Выборки&nbsp;</span>'
												},
                                                sRField
                                            ]
                                        }
                                   , {
                                    
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Справочники&nbsp;</span>'
												},
                                                dRField,
                                                dEField,
                                                dAField,
                                                dDField
                                            ]
                                        }
                                   , {
                                    
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            defaults: {width: 100},
                                            items: [
												{
													xtype: 'label',
													margin: '3 0 0 0',
													width: 200,
													html: '<span style="font-size: 100%">&nbsp;Пользователи&nbsp;</span>'
												},
                                                uRField,
                                                uEField,
                                                uAField,
                                                uDField
                                            ]
                                        }
                                   

                    ]
                });
				
				var userInfoPanel = Ext.create('Ext.form.Panel', {
                    bodyCls: 'alt-background',
                    region: 'north',
                    border: false,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
									defaults: {width: 300},
                                    items: [
                                        firstnameField,
                                        middlenameField,
                                        lastnameField,
                                        schoolUnitsCombo
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'vbox',
									defaults: {width: 300},
                                    items: [
                                        loginField,
                                        {
											xtype: 'fieldset',
											title: 'сменить пароль',
											items: [
												pwdField,
												pwdConfirmField
											]
										}
                                    ]
                                }
                            ]
                        }

                    ]
                })
				

                var formPanel = Ext.create('Ext.panel.Panel', {
                    layout: 'border',
                    border: false,
                    bodyPadding: 3,
                    bodyCls: 'alt-background',
                    items: [
                        userInfoPanel,
						{
							xtype: 'fieldset',
							title: 'Разрешения',
							region: 'center',
							layout: 'border',
							items: [
								checkBoxPanel
							]
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
                            url: 'AS_user_delete.php',
                            success: done,
                            params: {
                                id: id,
                                hard_delete: 1,
                                user_id: sessvars.userId
                            }
                        });
                    }
                }
				
				function loadUserData() {
					firstnameField.setValue(user.data.firstname);
					middlenameField.setValue(user.data.middlename);
					lastnameField.setValue(user.data.lastname);
					loginField.setValue(user.data.login);
					pwdField.setValue('');
					pwdConfirmField.setValue('');
					schoolUnitsCombo.setValue(user.data.school_unit_id);
					dayBalanceAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DAY_BALANCE_A'));
					dayBalanceADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DAY_BALANCE_AD'));
					dayBalanceASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DAY_BALANCE_AS'));
					dayBalanceDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DAY_BALANCE_D'));
					dayBalanceEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DAY_BALANCE_E'));
					dayBalanceRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DAY_BALANCE_R'));
					ddsASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DDS_AS'));
					ddsRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'DDS_R'));
					dAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'D_A'));
					dDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'D_D'));
					dEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'D_E'));
					dRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'D_R'));
					eggAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGG_A'));
					eggADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGG_AD'));
					eggASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGG_AS'));
					eggDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGG_D'));
					eggEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGG_E'));
					eggRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGG_R'));
					egsAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGS_A'));
					egsADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGS_AD'));
					egsASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGS_AS'));
					egsDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGS_D'));
					egsEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGS_E'));
					egsRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'EGS_R'));
					flCardAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'FL_CARD_A'));
					flCardADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'FL_CARD_AD'));
					flCardASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'FL_CARD_AS'));
					flCardDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'FL_CARD_D'));
					flCardEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'FL_CARD_E'));
					flCardRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'FL_CARD_R'));
					iRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'I_R'));
					lgAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LG_A'));
					lgADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LG_AD'));
					lgASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LG_AS'));
					lgDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LG_D'))
					lgEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LG_E'));
					lgRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LG_R'));
					ogAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'OG_A'));
					ogADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'OG_AD'));
					ogDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'OG_D'));
					ogEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'OG_E'));
					ogRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'OG_R'));
					passportEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'PASSPORT_E'));
					passportRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'PASSPORT_R'));
					salaryADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SALARY_AD'));
					salaryEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SALARY_E'));
					salaryRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SALARY_R'));
					spaAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SPA_A'));
					spaADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SPA_AD'));
					spaDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SPA_D'));
					spaEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SPA_E'));
					spaRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SPA_R'));
					spAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SP_A'));
					spADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SP_AD'));
					spASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SP_AS'));
					spDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SP_D'));
					spEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SP_E'));
					spRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'SP_R'));
					staffAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_A'));
					staffDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_D'));
					staffEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_E'));
					staffRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_R'));
					staffOperAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_OPER_A'));
					staffOperADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_OPER_AD'));
					staffOperDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_OPER_D'));
					staffOperEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_OPER_E'));
					staffOperRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'STAFF_OPER_R'));
					sRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'S_R'));
					testsAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'TESTS_A'));
					testsADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'TESTS_AD'));
					testsDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'TESTS_D'));
					testsEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'TESTS_E'));
					testsRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'TESTS_R'));
					tAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'T_A'));
					tADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'T_AD'));
					tASField.setValue(checkSelectedUserPrivileges(user.data.privileges,'T_AS'));
					tDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'T_D'));
					tEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'T_E'));
					tRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'T_R'));
					uAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'U_A'));
					uDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'U_D'));
					uEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'U_E'));
					uRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'U_R'));
					vehiclesAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'VEHICLES_A'));
					vehiclesDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'VEHICLES_D'));
					vehiclesEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'VEHICLES_E'));
					vehiclesRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'VEHICLES_R'));
					wbAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'WB_A'));
					wbADField.setValue(checkSelectedUserPrivileges(user.data.privileges,'WB_AD'));
					wbDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'WB_D'));
					wbEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'WB_E'));
					wbRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'WB_R'));
					lpAField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LP_A'));
					lpDField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LP_D'));
					lpEField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LP_E'));
					lpRField.setValue(checkSelectedUserPrivileges(user.data.privileges,'LP_R'));
				}
				
				function checkSelectedUserPrivileges(privileges,privilege){
					if (privileges.indexOf('#' + privilege + '#') != -1) {
						return true;
					} else {
						return false;
					}
				}
				
				function changeUserPrivilege(privilege,grant){
					if (grant){
						if (selectedPrivileges.indexOf('#' + privilege + '#') == -1){
							selectedPrivileges = selectedPrivileges+privilege+'#';
						}
					} else {
						selectedPrivileges = selectedPrivileges.replace('#'+privilege + '#','#');
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
                        url: 'AS_user_edit.php',
                        success: done,
                        failure: fail,
                        params: {
							id: id,
							firstname: firstnameField.getValue(),
							middlename: middlenameField.getValue(),
							lastname: lastnameField.getValue(),
							login: loginField.getValue(),
							pwd: pwd,
							school_unit_id: schoolUnitsCombo.getValue(),
							privileges: selectedPrivileges,
							user_id: sessvars.userId
						}
                    });
                }
				
				var win = new Ext.Window({
                    title: (is_new == 1) ? 'Новый пользователь' : 'Редактирование пользователя',
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    height: 500,
                    width: 850,
                    items: [formPanel],
                    bbar: [
                        {xtype: 'tbfill'},
                        {
                            xtype: 'button',
							disabled: !checkUserRole('U_E'),
                            text: 'ОК',
                            width: 150,
                            listeners: {
                                render: function () {
                                    this.addCls("x-btn-default-small");
                                    this.removeCls("x-btn-default-toolbar-small");
                                },
                                click: function () {
									if (loginField.getValue() == ''){
										Ext.MessageBox.alert('', 'Не задан логин');
										return;
									}
									if (is_new == 1 && pwdField.getValue() == ''){
										Ext.MessageBox.alert('', 'Не задан пароль');
										return;
									}
									if ((pwdField.getValue()!='')||(pwdConfirmField.getValue()!='')){
										if (pwdField.getValue()==pwdConfirmField.getValue()!=''){
											pwd = pwdField.getValue();
										} else {
											Ext.MessageBox.alert('', 'Пароль и подтверждение не совпадают!');
											return;
										}
									} else {
										pwd = '';
									}
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