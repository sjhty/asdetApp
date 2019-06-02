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

   await queryInterface.createTable('orders', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      consignee: STRING(20),
      level: STRING(20),
      agent: STRING(20),
      orderData: STRING(9999),
      create_at: DATE
   });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.dropTable('orders');
  }
};
