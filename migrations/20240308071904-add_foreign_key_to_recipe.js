'use strict';     

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key constraint
    await queryInterface.addConstraint('Recipe', {
      fields: ['Sub_Category_id'],
      type: 'foreign key',
      name: 'fk_subcategory_id',
      references: {
        table: 'subcategories', // Name of the referenced table
        field: 'Sub_Category_id' // Name of the referenced column in the Subcategories table
      },
      onDelete: 'CASCADE', // Define behavior on deletion
      onUpdate: 'CASCADE' // Define behavior on update
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint
    await queryInterface.removeConstraint('Recipe', 'fk_subcategory_id');
  }
};
