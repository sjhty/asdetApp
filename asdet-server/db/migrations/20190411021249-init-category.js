'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   const { INTEGER, STRING, DATE, DOUBLE } = Sequelize;

   await queryInterface.createTable('category', {
     id: {type: INTEGER, primaryKey: true, autoIncrement: true},
     name: STRING(30),
     price: DOUBLE,                 //零售价
     minister_price: DOUBLE,        //部长拿货价
     director_price: DOUBLE,        //理事拿货价
     president_price: DOUBLE,        //社长拿货价
     created_at: DATE
   });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.dropTable('category');
  }
};
