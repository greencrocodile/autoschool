Ext.Loader.setPath('Ext.ux', 'ux');
Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.data.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.toolbar.*'
]);

Ext.onReady(function () {
	initDataModels();
    var panelN = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        bodyCls: 'alt-background',
        items: [menuPanel]
    });

    if (checkUserRole('SALARY_R')) {

        //**********variables**********
        var selectedStaffId = -1;
        var selectedSalaryMonth = -1;
        var selectedSalaryYear = -1;


        //**********models**********
       

      

        //**********stores**********
        var salaryStore = Ext.create('Ext.data.Store', {
            model: 'SalaryModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_salary_list.php',
				simpleSortMode: true,
				extraParams: {salary_month: -1, salary_year: -1},
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
            remoteSort: true,
            pageSize: 1000000000
        });

        var monthStore = Ext.create('Ext.data.Store', {
            model: 'MonthsModel',
            data: [
                {id: 1, name: 'январь'},
                {id: 2, name: 'февраль'},
                {id: 3, name: 'март'},
                {id: 4, name: 'апрель'},
                {id: 5, name: 'май'},
                {id: 6, name: 'июнь'},
                {id: 7, name: 'июль'},
                {id: 8, name: 'август'},
                {id: 9, name: 'сентябрь'},
                {id: 10, name: 'октябрь'},
                {id: 11, name: 'ноябрь'},
                {id: 12, name: 'декабрь'},
            ]
        });

        //**********combos**********
        var salaryMonthCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Месяц выплаты',
            store: monthStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            margin: '5 5 5 5',
            anchor: '100%',
            editable: false,
            allowBlank: false,
            listeners: {
                'change': function () {
                    loadSalaryData(salaryMonthCombo.getValue(), salaryYearField.getValue());
                }
            }
        });

        //**********fields**********

        var salaryYearField = Ext.create('Ext.form.field.Number', {
            width: 200,
            allowDecimal: false,
            minValue: 2000,
            maxValue: 2100,
            allowBlank: false,
            margin: '5 5 5 5',
            value: 0,
            listeners: {
                'change': function () {
                    loadSalaryData(salaryMonthCombo.getValue(), salaryYearField.getValue());
                }
            }
        });

        //**********grids**********
        var salaryGrid = Ext.create('Ext.grid.Panel', {
            store: salaryStore,
            region: 'center',
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'post_name',
                    text: 'должность',
                    width: 200,
                    sortable: false
                }, {
                    dataIndex: 'staff_initials_name',
                    text: 'ФИО',
                    width: 200,
                    sortable: false
                }, {
                    dataIndex: 'salary',
                    text: 'начислено, руб.',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'keeping',
                    text: 'удержано, руб.',
                    width: 100,
                    sortable: false
                }, {
                    dataIndex: 'for_pay',
                    text: 'на руки, руб.',
                    width: 100,
                    sortable: false
                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: salaryStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }),
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
						
						selectedStaffId = record.data.staff_id;
						selectedSalaryMonth = record.data.salary_month;
						selectedSalaryYear = record.data.salary_year;
                        staffNameLabel.setText('<span style="font-size: 180%; color: red">&nbsp;[' + record.data.staff_initials_name + ']&nbsp;</span>', false);
                        
                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedStaffId = record.data.staff_id;
						selectedSalaryMonth = record.data.salary_month;
						selectedSalaryYear = record.data.salary_year;
                        staffNameLabel.setText('<span style="font-size: 180%; color: red">&nbsp;[' + record.data.staff_initials_name + ']&nbsp;</span>', false);
                        editStaffSalary(selectedStaffId,selectedSalaryMonth,selectedSalaryYear,
							function(){
								salaryStore.reload();
							}
						)
                    }
                }
            }
        })

       

        var staffNameLabel = Ext.create('Ext.form.Label', {
            frame: true,
            margin: '10 10 10 10'
        });

        var panelS = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Зарплата ИПС&nbsp;</span>'
                },
                staffNameLabel
            ]
        });

        var salaryInfoLabel = Ext.create('Ext.form.Label', {
            frame: true,
            margin: '10 10 10 10',
            html: '<span style="font-size: 180%; font-weight: bold">&nbsp;salaryInfoLabel&nbsp;</span>'
        });

        var salaryListPanel = Ext.create('Ext.panel.Panel', {
            // title: 'список',
            layout: 'border',
			region: 'center',
            bodyCls: 'alt-background',
            id: 'salaryListPanel',
            items: [
                {
                    xtype: 'fieldcontainer',
                    region: 'north',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'label',
                            html: '<span style="font-size: 150%">&nbsp;Зарплата за&nbsp;</span>'
                        },
                        {
                            xtype: 'fieldset',
                            items: [
                                salaryInfoLabel,
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Полный расчёт зарплаты',
                            disabled: !checkUserRole('SALARY_E'),
                            listeners: {
                                click: function () {
                                    salaryCalculate(selectedSalaryMonth, selectedSalaryYear,
                                            function () {
                                                salaryStore.reload();
                                            })
                                }
                            }
                        },
						{
							xtype: 'button',
							// text: 'Документы',
							iconCls: 'report-img',
							listeners: {
								click: function () {
									if (selectedSalaryMonth != -1 && selectedSalaryYear != -1){
										exportReports('salary_reports',selectedSalaryMonth,selectedSalaryYear,-1,-1,-1,function () {})
									}
								}
							}
						}

                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    region: 'north',
                    items: [
                        salaryMonthCombo,
                        salaryYearField
                    ]
                },
                salaryGrid
            ]
        });


        function loadSalaryData(pay_month, pay_year) {
            if (pay_month == 1) {
                selectedSalaryMonth = 12;
                selectedSalaryYear = pay_year - 1;
            } else {
                selectedSalaryMonth = pay_month - 1;
                selectedSalaryYear = pay_year;
            }
            switch (selectedSalaryMonth) {
                case 1:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;январь ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 2:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;февраль ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 3:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;март ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 4:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;апрель ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 5:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;май ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 6:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;июнь ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 7:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;июль ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 8:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;август ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 9:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;сентябрь ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 10:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;октябрь ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 11:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;ноябрь ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;
                case 12:
                    salaryInfoLabel.setText('<span style="font-size: 150%">&nbsp;декабрь ' + selectedSalaryYear + '&nbsp;</span>', false);
                    break;

                default:
                    salaryInfoLabel.setText('', false);
                    break;
            }
            salaryStore.getProxy().extraParams = {salary_month: selectedSalaryMonth, salary_year: selectedSalaryYear};
            salaryStore.load();
        }

        function loadCurrentSalaryData() {
            var now = new Date();
            pay_month = now.getMonth() + 1;
            pay_year = now.getFullYear();
            salaryMonthCombo.setValue(pay_month);
            salaryYearField.setValue(pay_year);
            loadSalaryData(pay_month, pay_year);
        }

        

        function salaryCalculate(salaryMonth, salaryYear, callback) {

            Ext.MessageBox.confirm('Confirm', 'Дальнейшие действия приведут к удалению записей по зарплате за данный месяц\nПродолжать?', function (btn) {
                function done(result, request) {
                    if (callback) {
                        callback();
                    }
                }
                function fail(result, request) {
                    Ext.Msg.alert('Ошибка', 'При сохранении данных произошла ошибка:</br>' + ((result.responseText == '') ? 'невозможно выполнить запрос к БД' : result.responseText) + '<br/>Попробуйте повторить операцию.');
                }

                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: 'AS_salary_calculate.php',
                        success: done,
                        failure: fail,
                        params: {
                            salary_month: salaryMonth,
                            salary_year: salaryYear,
                            user_id: sessvars.userId
                        }
                    });
                }
            })
        }

        loadCurrentSalaryData();

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelS,
				salaryListPanel
            ]
        });

    } else {
        var noPrivilegesPanel = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">У вас нет доступа к просмотру данных этой страницы</span>'
                }
            ]
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                noPrivilegesPanel
            ]
        });
    }
});
