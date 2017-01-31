Ext.Loader.setPath('Ext.ux', 'ux');
Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.data.*',
    'Ext.form.*',
    'Ext.grid.*',
    'Ext.toolbar.*',
	'Ext.grid.plugin.BufferedRenderer'
]);

Ext.onReady(function () {
	initDataModels();
	

    var panelN = Ext.create('Ext.panel.Panel', {
        region: 'north',
        border: false,
        bodyCls: 'alt-background',
        items: [menuPanel]
    });

    if (checkUserRole('DDS_R')) {
       
        //**********stores**********
        var schoolUnitsStore = Ext.create('Ext.data.Store', {
            model: 'SchoolUnitsModel',
			proxy: {
                type: 'jsonp',
                url: 'AS_school_units_list.php',
                extraParams: {start_id: -1, active_only: 1, whole_as: 1, id: -1},
                simpleSortMode: true,
                reader: {
                    root: 'list',
                    totalProperty: 'total'
                }
            },
            remoteSort: true,
			pageSize: 1000000000,
            listeners: {
                'load': function () {
                    schoolUnitsCombo.setValue((sessvars.userPrivileges.indexOf('#DDS_AS#') == -1?sessvars.schoolUnitId:-1));
                }
            }
        });

        schoolUnitsStore.getProxy().extraParams = {start_id: (sessvars.userPrivileges.indexOf('#DDS_AS#') == -1?0:-1), active_only: 1, whole_as: 1, id: (sessvars.userPrivileges.indexOf('#DDS_AS#') == -1?sessvars.schoolUnitId:-1)};
        schoolUnitsStore.load();

        var articlesStore = Ext.create('Ext.data.Store', {
            model: 'ArticlesModel',
			proxy: {
                type: 'jsonp',
                url: 'AS_articles_list.php',
                extraParams: {start_id: -1},
                simpleSortMode: true,
                reader: {
                    root: 'list',
                    totalProperty: 'total'
                }
            },
            remoteSort: true,
			pageSize: 1000000000,
            listeners: {
                'load': function () {
                    articlesCombo.setValue(-1);
                }
            }
        });

        articlesStore.load();
		
		var ddsStore = Ext.create('Ext.data.Store', {
			model: 'DDSModel',
			// buffered: true,
			// leadingBufferZone: 300,
			pageSize: 100,
			proxy: {
				type: 'jsonp',
				url: 'AS_dds_list.php',
				extraParams: {payment_date_from: '', payment_date_till: '', school_unit_id: -1},
				reader: {
					root: 'list',
					totalProperty: 'total'
				},
			}
		});

        var ddsArticlesStore = Ext.create('Ext.data.Store', {
            model: 'DDSArticlesModel',
			// buffered: true,
			// leadingBufferZone: 300,
			pageSize: 100,
			proxy: {
                type: 'jsonp',
                url: 'AS_dds_articles_list.php',
                extraParams: {payment_date_from: '', payment_date_till: '', article_id: -1, comment: '', school_unit_id: -1},
                simpleSortMode: true,
                reader: {
                    root: 'list',
                    totalProperty: 'total'
                }
            }
        });

        //**********combos**********
        var schoolUnitsCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Подразделение',
            store: schoolUnitsStore,
            queryMode: 'local',
            displayField: 'name_full',
            valueField: 'id',
            margin: '5 5 5 5',
            labelWidth: 100,
            width: 500,
            editable: true,
            allowBlank: false
			});

        var articlesCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Статья',
            store: articlesStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            margin: '5 5 5 5',
            labelWidth: 100,
            width: 500,
            editable: true,
            allowBlank: false,
            hidden: true
        });

        //**********fields**********

        var paymentsDateFromField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'С',
			startDay: 1,
            labelWidth: 100,
            format: 'd.m.Y',
            margin: '5 5 5 5'
        });

        var paymentsDateTillField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'По',
			startDay: 1,
            labelWidth: 100,
            format: 'd.m.Y',
            margin: '5 5 5 5'
        });

        var commentField = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Примечание',
            labelWidth: 100,
            margin: '5 5 5 5',
            hidden: true
        });

        //**********grids**********
        var ddsGrid = Ext.create('Ext.grid.Panel', {
            region:'center',
			store: ddsStore,
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [
                {
                    dataIndex: 'payment_date',
                    text: 'дата',
                    width:70,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y')
                }, {
                    dataIndex: 'in_value',
                    text: 'приход, руб.',
                    width:70
                }, {
                    dataIndex: 'out_value',
                    text: 'расход, руб.',
                    width:70
                }, {
                    dataIndex: 'saldo',
                    text: 'сальдо, руб.',
                    width:70
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: ddsStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            })
        });

        var ddsArticlesGrid = Ext.create('Ext.grid.Panel', {
            region:'center',
            store: ddsArticlesStore,
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [
                {
                    dataIndex: 'payment_date',
                    text: 'дата',
                    width:70,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y')
                }, {
                    dataIndex: 'article_name',
                    text: 'статья',
                    width:400
                }, {
                    dataIndex: 'comment',
                    text: 'примечание',
                    width:400
                }, {
                    dataIndex: 'in_value',
                    text: 'приход, руб.',
                    width:70
                }, {
                    dataIndex: 'out_value',
                    text: 'расход, руб.',
                    width:70
                }, {
                    dataIndex: 'act_date',
                    text: 'дата акт.',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                    width:70
                }, {
                    dataIndex: 'act_name',
                    text: 'кто акт.',
                    width:100
                }, {
                    dataIndex: 'school_unit_name_short',
                    text: 'место',
                    width:70
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: ddsArticlesStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            })
        });

        //**********buttons**********

        var bLoadDds = Ext.create('Ext.Button', {
            text: 'Выбор',
            margin: '5 5 5 5',
            listeners: {
                click: function () {
                    loadDds();
                }
            }
        });

        var bLoadDdsArticles = Ext.create('Ext.Button', {
            text: 'Выбор',
            margin: '5 5 5 5',
            listeners: {
                click: function () {
                    loadDdsArticles();
                }
            },
            hidden: true
        });

        //**********panels**********

        var panelP = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Движение денежных средств&nbsp;</span>'
                }
            ]
        });

        var panelFilter = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
			// collapsible: true,
			// collapsed: true,
			// title: 'Фильтр',
            items: [
                schoolUnitsCombo,
                paymentsDateFromField,
                paymentsDateTillField,
                articlesCombo,
                commentField,
                bLoadDds,
                bLoadDdsArticles,
				{
					xtype: 'button',
					margin: '5 5 5 5',
					iconCls: 'report-img',
					listeners: {
						click: function () {
							// panelDds.body.mask('Подождите...');
							// exportReport('#',-1,-1,schoolUnitsCombo.getValue(),((paymentsDateFromField.getValue() == '')||(paymentsDateFromField.getValue() == null))?-1:paymentsDateFromField.getValue(),((paymentsDateTillField.getValue() == '')||(paymentsDateTillField.getValue() == null))?-1:paymentsDateTillField.getValue(),function () {
								// console.log('callback');
								// panelDds.body.unmask();
							// })
							if (schoolUnitsCombo.getValue() != -1 || paymentsDateFromField.getValue() != null || paymentsDateTillField.getValue() != null){
								exportReports('dds_reports',-1,-1,schoolUnitsCombo.getValue(),((paymentsDateFromField.getValue() == '')||(paymentsDateFromField.getValue() == null))?-1:paymentsDateFromField.getValue(),((paymentsDateTillField.getValue() == '')||(paymentsDateTillField.getValue() == null))?-1:paymentsDateTillField.getValue(),function () {})
							}
						}
					}
				}

				
            ]
        });

        var ddsTab = Ext.create('Ext.panel.Panel', {
            title: 'по дням',
            bodyCls: 'alt-background',
			layout: 'border',
            id: 'ddsTab',
            items: [
                ddsGrid
            ]
        });

        var ddsArticlesTab = Ext.create('Ext.panel.Panel', {
            title: 'по статьям',
            bodyCls: 'alt-background',
			layout: 'border',
            id: 'ddsArticlesTab',
            items: [
                ddsArticlesGrid
            ]
        });

        var ddsTabPanel = Ext.create('Ext.tab.Panel', {
            id: 'ddsTabPanel',
            region: 'center',
            border: false,
            items: [
                ddsTab,
                ddsArticlesTab
            ]
        })

        var onddsTabHeaderClick = function (btn, e) {
            // clearDds();
            articlesCombo.hide();
            commentField.hide();
            bLoadDdsArticles.hide();
            bLoadDds.show();
        };

        var onddsArticlesTabHeaderClick = function (btn, e) {
            // clearDds();
            articlesCombo.show();
            commentField.show();
            bLoadDds.hide();
            bLoadDdsArticles.show();
        };

        ddsTab.tab.on('click', onddsTabHeaderClick);
        ddsArticlesTab.tab.on('click', onddsArticlesTabHeaderClick);
        // ddsTabPanel.setActiveTab('ddsTab');

        var panelDds = Ext.create('Ext.form.Panel', {
            region: 'center',
            layout: 'border',
            bodyCls: 'alt-background',
            border: false,
            bodyPadding: 5,
            items: [
                ddsTabPanel
            ]
        });

        //***********functions**********

        function clearDds() {
            schoolUnitsCombo.setValue(-1);
            paymentsDateFromField.setValue('');
            paymentsDateTillField.setValue('');
            articlesCombo.setValue(-1);
            commentField.setValue('');
            ddsStore.getProxy().extraParams = {payment_date_from: '', payment_date_till: '', school_unit_id: -2};
            ddsStore.load();
            ddsArticlesStore.getProxy().extraParams = {payment_date_from: '', payment_date_till: '', article_id: -2, comment: '', school_unit_id: -2};
            ddsArticlesStore.load();
        }

        function loadDds() {
            ddsStore.getProxy().extraParams = {
                payment_date_from: paymentsDateFromField.getValue(),
                payment_date_till: paymentsDateTillField.getValue(),
                school_unit_id: schoolUnitsCombo.getValue()
            };
            ddsStore.load();
        }

        function loadDdsArticles() {
            ddsArticlesStore.getProxy().extraParams = {
                payment_date_from: paymentsDateFromField.getValue(),
                payment_date_till: paymentsDateTillField.getValue(),
                school_unit_id: schoolUnitsCombo.getValue(),
                article_id: articlesCombo.getValue(),
                comment: commentField.getValue()
            };
            ddsArticlesStore.load();
        }


        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelFilter,
				panelDds
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
