'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE, DOUBLE} = app.Sequelize;

    const Category = app.model.define('category', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        name: STRING(30),
        price: DOUBLE,                 //零售价
        minister_price: DOUBLE,        //部长拿货价
        director_price: DOUBLE,        //理事拿货价
        president_price: DOUBLE,        //社长拿货价
        created_at: DATE
    },{
        timestamps: false,  //去除createAt updateAt
        freezeTableName: true,  //使用自定义表名
    });

    return Category;
}