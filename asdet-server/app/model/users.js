'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;

    const Users = app.model.define('users', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        name: STRING(30),
        password: STRING(100),
        level: INTEGER,
        mobile: STRING(20),
        created_at: DATE
    },{
        timestamps: false,  //去除createAt updateAt
        freezeTableName: true,  //使用自定义表名
    });

    return Users;
}