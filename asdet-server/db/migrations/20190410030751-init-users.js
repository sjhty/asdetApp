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

    await queryInterface.createTable('users', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},
      name: STRING(30),
      password: STRING(100),
      level: INTEGER,
      mobile: STRING(20),
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

    await queryInterface.dropTable('users');
  }
};
