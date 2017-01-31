function exportReports(type,salary_month,salary_year,dds_school_unit_id,dds_payment_date_from,dds_payment_date_till,callback) {
	
	var variablesStore = Ext.create('Ext.data.Store', {
		model: 'VariablesModel',
		remoteSort: true,
		proxy: {
			type: 'jsonp',
			url: 'AS_variables_list.php',
			simpleSortMode: true,
			reader: {
				root: 'list'
			}
		},
		sorters: [{
			property: 'name',
			direction: 'ASC'
		}]
	});

	variablesStore.load({
		callback: function (records, operation, success) {
			var variable = variablesStore.getById(type);
			if (variable){   
			
				var items = [];
				var documentsStore = Ext.create('Ext.data.Store', {
                    model: 'ReportsExportModel',
					proxy: {
						type: 'jsonp',
						url: 'AS_reports_export_list.php',
						extraParams: {codes: variable.data.value},
						reader: {
							type: 'json',
							root: 'list'
						},
						pageSize: 0
					},
                    pageSize: 1000000000,
                    listeners: {
                        'load': function () {
							documentsStore.each(function (record) {
								items.push({
									boxLabel: record.data.name,
									name: record.data.list_number,
								});
							});
                        }
                    }
                });
				
				
				documentsStore.load({
					callback: function (records, operation, success) {	
						var formPanel = Ext.create('Ext.form.Panel', {
							border: false,
							bodyPadding: 5,
							region: 'north',
							bodyCls: 'alt-background',
							fieldDefaults: {
								labelAlign: 'left',
								labelWidth: 150,
								anchor: '100%'
							},
							items: [
								{
									xtype: 'checkboxgroup',
									id: 'doctypeslist',
									columns: 1,
									items: items
								}
							]
						});
						
						function save() {
							var index = 0;
							var list = '';
							var a = Ext.getCmp('doctypeslist').getChecked();
							for (index = 0; index < a.length; ++index) {
								list = list+a[index].name+'#';
							}
							list = '#'+list;
							formPanel.body.mask('Подождите...');
							exportReport(list,salary_month,salary_year,dds_school_unit_id,dds_payment_date_from,dds_payment_date_till,function(){
								formPanel.body.unmask();
								win.close();
							})
						}

						var win = new Ext.Window({
							title: '',
							layout: 'fit',
							resizable: true,
							modal: true,
							autoScroll: true,
							height: 300,
							width: 400,
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
											win.close();
										}
									}
								}

							]
						}).show();
					}
				});
            }
        }
    });
}			