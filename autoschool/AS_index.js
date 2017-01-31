Ext.Loader.setPath('Ext.ux', 'ux');
Ext.onReady(function () {
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [
            menuPanel
        ]
    });
});
