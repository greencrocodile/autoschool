Ext.onReady(function() {
		Ext.Ajax.timeout = 180000;
		Ext.override(Ext.form.Basic, { timeout: Ext.Ajax.timeout / 1000 });
		Ext.override(Ext.data.proxy.Server, { timeout: Ext.Ajax.timeout });
		Ext.override(Ext.data.Connection, { timeout: Ext.Ajax.timeout });

		Ext.grid.Panel.prototype.columnLines=true;
		
		Ext.form.field.Date.override({
				initComponent: function () {
						if (!Ext.isDefined(this.initialConfig.startDay)) {
								this.startDay = Ext.picker.Date.prototype.startDay;
						}
						this.callParent();
				}
		});
		
		Ext.define('Ext.grid.PanelOverride', {
				override: 'Ext.grid.Panel',
				initComponent: function() {
					this.callParent(arguments);    	
					var showHorScrollBar = function() {
						this.setHeight(null);
						var viewDiv = this.getView().getEl().dom;
						if(viewDiv && viewDiv.offsetHeight != viewDiv.clientHeight)
							this.setHeight(this.getHeight() + viewDiv.offsetHeight - viewDiv.clientHeight);
							if(Ext.isIE7 && viewDiv.clientHeight != viewDiv.scrollHeight)
								this.setHeight(this.getHeight() + viewDiv.scrollHeight - viewDiv.clientHeight);
					};
					this.on('viewready', showHorScrollBar, this); 
					this.on('columnresize', showHorScrollBar, this); 
					this.getView().on('itemadd', showHorScrollBar, this);
					this.getView().on('itemremove', showHorScrollBar, this);
					this.getView().on('itemupdate', showHorScrollBar, this);
					this.getView().on('refresh', showHorScrollBar, this);
				}
		});		
});