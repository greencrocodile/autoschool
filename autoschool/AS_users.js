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

    if (checkUserRole('U_R')) {

        //**********variables**********
        var selectedUserId = -1;
    

        //**********stores**********
        var usersStore = Ext.create('Ext.data.Store', {
            model: 'UsersModel',
			proxy: {
				type: 'jsonp',
				url: 'AS_users_list.php',
				simpleSortMode: true,
				extraParams: {start_id: 0, active_only: 0},
				reader: {
					root: 'list',
					totalProperty: 'total'
				}
			},
            remoteSort: true,
            pageSize: 1000000000
        });
		
		usersStore.load();

      
		
        //**********grids**********
        var usersGrid = Ext.create('Ext.grid.Panel', {
            store: usersStore,
            region: 'center',
            margin: '10 0 10 0',
            disableSelection: false,
            rowLines: true,
            columnLines: true,
            columns: [{
                    dataIndex: 'full_name',
                    text: 'ФИО',
                    width: 300,
                    sortable: true
                }, {
                    dataIndex: 'school_unit_name_full',
                    text: 'подразделение школы',
                    width: 200,
                    sortable: true
                }, {
                    dataIndex: 'login',
                    text: 'логин',
                    width: 100,
                    sortable: true
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: usersStore,
                displayInfo: true,
                displayMsg: '{0} - {1} из {2}',
                emptyMsg: 'Список пуст'
            }), 
			viewConfig: {
                getRowClass: function (record) {
                    if (record.get('active') == 0) {
                        return 'deleted-row';
                    }
                }
            },
            listeners: {
                itemclick: function (view, record) {
                    if (record) {
						
                        selectedUserId = record.data.id;

                    }
                },
                itemdblclick: function (view, record) {
                    if (record) {
                        selectedUserId = record.data.id;
						editUser(record.data.id,0,function(){
							usersStore.reload();
						})

                    }
                }
            }
        })

        //**********panels**********
        var panelU = Ext.create('Ext.panel.Panel', {
            region: 'north',
            border: false,
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'label',
                    html: '<span style="font-size: 180%; font-weight: bold">&nbsp;Пользователи&nbsp;</span>'
                }
            ]
        });

        var editUserPanel = Ext.create('Ext.panel.Panel', {
            border: false,
			region: 'north',
            bodyCls: 'alt-background',
            items: [
                {
                    xtype: 'button',
                    text: 'Новый пользователь',
                    margin: '3 3 3 3',
                    listeners: {
                        click: function () {
							addUser(function(id){
								editUser(id,1,function(){
									usersStore.reload();
								})
							});
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Удалить пользователя',
                    margin: '3 3 3 3',
					listeners: {
                        click: function () {
							deleteUser(selectedUserId,function(){
								usersStore.reload();
							})
                        }
                    }
                }
            ]
        });

        var usersListPanel = Ext.create('Ext.panel.Panel', {
			region: 'center',
            bodyCls: 'alt-background',
            id: 'usersListPanel',
			layout: 'border',
            items: [
                editUserPanel,
                usersGrid
            ]
        });

        
		function addUser(callback) {
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
					url: 'AS_user_edit.php',
					success: done,
					failure: fail,
					params: {
						id: -1,
						firstname: '',
						middlename: '',
						lastname: '',
						login: '',
						pwd: '',
						school_unit_id: -1,
						privileges: '#',
						user_id: sessvars.userId
					}
				});
            }

            save();

        }

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                panelN,
                panelU,
                usersListPanel
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
