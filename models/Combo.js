'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Combo extends Model {
    static associate(models) {
      // Define associations if any
    }
  }

  Combo.init({
    comboid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comboname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    combodescription: {
      type: DataTypes.STRING,
    },
    combotthumbnail: {
      type: DataTypes.STRING,
    },
    comboprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Combo',
    tableName: 'combos', // Ensure Sequelize uses the correct table name
    timestamps: true, // Enable timestamps to manage createdAt and updatedAt fields
    paranoid: true,
  });

  return Combo;
};
