'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;

    const Orders = app.model.define('orders', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        consignee: STRING(20),
        level: STRING(20),
        agent: STRING(20),
        orderData: STRING(9999),
        create_at: DATE
    },{
        timestamps: false,  //去除createAt updateAt
        freezeTableName: true,  //使用自定义表名
    });

    return Orders;
}