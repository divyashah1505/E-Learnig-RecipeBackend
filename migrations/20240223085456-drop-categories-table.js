// migrations/YYYYMMDDHHMMSS-drop-customers-table.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  },

  down: async (queryInterface, Sequelize) => {
    // You can implement the down function to recreate the customers table if needed
    // This is optional and depends on whether you need to revert this migration
  }
};
