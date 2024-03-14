'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('subcategories', 'deleted_at');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('subcategories', 'deleted_at', {
      type: Sequelize.DATE
    });
  }
};
