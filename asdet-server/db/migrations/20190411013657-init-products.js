'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   const { INTEGER, STRING, DATE } = Sequelize;

   await queryInterface.createTable('products', {
     id: {type: INTEGER, primaryKey: true, autoIncrement: true},
     name: STRING(30),              //商品名称
     category_id: INTEGER,          //商品分类ID
     attribute: STRING(300),            //商品属性
     imgUrl: STRING(200),           //商品图片地址
     stock: INTEGER,                    //商品库存
     created_at: DATE
   })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.dropTable('products');
  }
};
