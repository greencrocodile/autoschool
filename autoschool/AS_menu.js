sessvars.myObj = {userId: -1, userName: '', userPrivileges: '#', schoolUnitId: -1};
var menu1 = Ext.create('Ext.menu.Menu', {
    items: [{
            text: 'Паспорт автошколы',
            disabled: !checkUserRole('PASSPORT_R')
        }, {
            text: 'Транспортные средства',
            handler: function () {
                location.href = 'vehicles.html';
            },
            disabled: !checkUserRole('VEHICLES_R')
        }, {
            text: 'Программы обучения',
            handler: function () {
                location.href = 'lprograms.html';
            },
            disabled: !checkUserRole('LP_R')
        }, {
            text: 'Инструкторско-преподавательский состав (ИПС)',
            handler: function () {
                location.href = 'staff.html';
            },
            disabled: !checkUserRole('STAFF_R')
        }, {
            text: 'Зарплата ИПС',
            handler: function () {
                location.href = 'salary.html';
            },
            disabled: !checkUserRole('SALARY_R')
        }, {
            text: 'Движение денежных средств',
            handler: function () {
                location.href = 'dds.html';
            },
            disabled: !checkUserRole('DDS_R')
        }, {
            text: 'Суточный баланс',
            handler: function () {
                location.href = 'payments.html';
            },
            disabled: !checkUserRole('DAY_BALANCE_R')
        }]
});
var menu2 = Ext.create('Ext.menu.Menu', {
    items: [{
		text: 'Учебные группы',
            handler: function () {
                location.href = 'lgroups.html';
            },
            disabled: !checkUserRole('LG_R')
        }, {
            text: 'Учёт сдачи зачётов',
            handler: function () {
                location.href = 'tests.html';
            },
            disabled: !checkUserRole('TESTS_R')
        }, {
            text: 'Индивидуальные программы',
            handler: function () {
                location.href = 'individuals.html';
            },
            disabled: !checkUserRole('I_R')
        }, {
            text: 'Экзаменационные группы АШ',
            handler: function () {
                location.href = 'exam_school.html';
            },
            disabled: !checkUserRole('EGS_R')
        }, {
            text: 'Экзаменационные группы ГИБДД',
            handler: function () {
                location.href = 'exam_gibdd.html';
            },
            disabled: !checkUserRole('EGG_R')
        }, {
            text: 'Путевые листы',
            handler: function () {
                location.href = 'waybills.html';
            },
            disabled: !checkUserRole('WB_R')
        }, {
            text: 'Учёт оплаты обучения',
            handler: function () {
                location.href = 'student_payments.html';
            },
            disabled: !checkUserRole('SP_R')
        }]
})
var menu3 = Ext.create('Ext.menu.Menu', {
    items: [{
            text: 'Справочники',
            handler: function () {
                location.href = 'dict.html';
            },
            disabled: !checkUserRole('D_R')
        }, {
            text: 'Пользователи',
            handler: function () {
                location.href = 'users.html';
            },
            disabled: !checkUserRole('U_R')
        }
    ]
});
var menuPanel = Ext.create('Ext.panel.Panel', {
    region: 'north',
    renderTo: Ext.getBody(),
    tbar: [{
            xtype: 'button',
            text: 'На главную',
            handler: function () {
                location.href = 'index.html';
            }
        }, {
            xtype: 'splitbutton',
            text: 'Автошкола',
            menu: menu1
        }, {
            xtype: 'splitbutton',
            text: 'Учёт обучения',
            menu: menu2
        }, {
            xtype: 'splitbutton',
            text: 'Администрирование',
            menu: menu3
        }, {
            xtype: 'button',
            text: (sessvars.userPrivileges) ? ((sessvars.userPrivileges == '#') ? 'Вход в систему' : 'Выход из системы (' + sessvars.userName + ')') : 'Вход в систему',
            handler: function () {
                if (sessvars.userPrivileges) {
                    if (sessvars.userPrivileges == '#') {
                        login();
                    } else {
                        logout();
                    }
                } else {
                    login();
                }


            }
        }]
});

function checkUserRole(role) {
    if (sessvars.userPrivileges) {
        if (sessvars.userPrivileges.indexOf('#' + role + '#') != -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function login() {
    Ext.define("UserInfoModel", {
        extend: 'Ext.data.Model',
        proxy: {
            type: 'jsonp',
            url: 'AS_login.php',
            reader: {
                type: 'json',
                root: 'list'
            },
            pageSize: 0
        },
        extraParams: {login: '', pwd: ''},
        fields: [
            {name: 'id', type: 'int'},
            'name',
            'privileges',
            {name: 'school_unit_id', type: 'int'}
        ]
    });

    var userInfoStore = Ext.create('Ext.data.Store', {
        model: 'UserInfoModel'
    });

    var loginField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'логин',
        enableKeyEvents: true,
        listeners: {
            keydown: function (loginField, e) {
                if (e.keyCode == 13) {
                    pwdField.focus();
                }
            }
        }
    })

    var pwdField = Ext.create('Ext.form.field.Text', {
        fieldLabel: 'пароль',
        inputType: 'password',
        enableKeyEvents: true,
        listeners: {
            keydown: function (loginField, e) {
                if (e.keyCode == 13) {
                    bOk.fireEvent('click');
                }
            }
        }
    })

    var fieldsPanel = Ext.create('Ext.form.Panel', {autoScroll: true,
        frame: false,
        border: false,
        bodyPadding: 5,
        region: 'north',
        bodyCls: 'alt-background',
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 50,
            anchor: '100%'
        },
        items: [
            loginField,
            pwdField
        ]
    });

    var formPanel = Ext.create('Ext.form.Panel', {autoScroll: true,
        layout: 'border',
        border: false,
        items: [fieldsPanel]
    })

    var bOk = Ext.create('Ext.Button', {
        text: 'ОК',
        width: 150,
        listeners: {
            render: function () {
                this.addCls("x-btn-default-small");
                this.removeCls("x-btn-default-toolbar-small");
            },
            click: function () {
                if (!loginField.isValid()) {
                    Ext.Msg.alert('Ошибка', 'Логин должен быть задан.');
                    return;
                }
                if (!pwdField.isValid()) {
                    Ext.Msg.alert('Ошибка', 'Пароль должен быть задан.');
                    return;
                }
                userInfoStore.getProxy().extraParams = {login: loginField.getValue(), pwd: pwdField.getValue()};
                userInfoStore.load({
                    callback: function (records, operation, success) {
                        rec = userInfoStore.first();
                        sessvars.userId = rec.get('id');
                        sessvars.userName = rec.get('name');
                        sessvars.userPrivileges = rec.get('privileges');
                        sessvars.schoolUnitId = rec.get('school_unit_id');
                        if (sessvars.userPrivileges == '#') {
                            Ext.Msg.alert('Ошибка', 'Ошибка авторизации.<br/>Введён неверный логин или пароль');
                            return;
                        }
                        win.close();
                        location.href = 'index.html';
                    }
                });
            }
        }
    });

    var bCancel = Ext.create('Ext.Button', {
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
    });

    var win = new Ext.Window({
        title: 'Авторизация',
        layout: 'fit',
        resizable: false,
        modal: true,
        height: 150,
        width: 300,
        items: [formPanel],
        bbar: [
            {xtype: 'tbfill'},
            bOk,
            bCancel

        ]
    }).show();

    loginField.focus();

}

function logout() {
    sessvars.userId = -1;
    sessvars.userName = '';
    sessvars.userPrivileges = '#';
    sessvars.schoolUnitId = -1;
    location.href = 'index.html';
}