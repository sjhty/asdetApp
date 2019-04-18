'use strict';

module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;

    const Products = app.model.define('products', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        name: STRING(30),              //商品名称
        category_id: INTEGER,          //商品分类ID
        attribute: STRING(300),            //商品属性
        imgUrl: STRING(200),           //商品图片地址
        stock: INTEGER,                    //商品库存
        created_at: DATE
    },{
        timestamps: false,  //去除createAt updateAt
        freezeTableName: true,  //使用自定义表名
    });

    Products.associate = function() {
       Products.belongsTo(app.model.Category, { as: 'category', foreignKey: 'category_id'}) 
    }
    

    return Products;
}