// <timestamp>-add-plansthumbnail-to-plans.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Plan', 'plansthumbnail', {
      type: Sequelize.STRING, // Adjust the data type as per your requirements
      allowNull: true, // Modify as per your needs
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Plan', 'plansthumbnail');
  }
};
