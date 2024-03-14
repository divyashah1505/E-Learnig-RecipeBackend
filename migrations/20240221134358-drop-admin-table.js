// migrations/YYYYMMDDHHMMSS-drop-customers-table.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin');
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
