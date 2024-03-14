'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('subcategories', 'subcategories_Category_id_fk');
  },

  down: async (queryInterface, Sequelize) => {
    // You can add code to recreate the foreign key constraint if needed
  }
};
