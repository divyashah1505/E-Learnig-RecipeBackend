'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear all data from the categories table
    await queryInterface.sequelize.query('TRUNCATE TABLE categories;');
  },

  down: async (queryInterface, Sequelize) => {
    // No need to define a down function for this migration
    // If you want to rollback this operation, you'll need to create a new migration
  }
};
