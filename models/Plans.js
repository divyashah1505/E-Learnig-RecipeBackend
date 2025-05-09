// models/Plans.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      // Define associations if needed
    }
  }

  Plan.init({
    planid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    planname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    planprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Plan_Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'Plan',
    timestamps: true,
    paranoid: true,
  });

  return Plan;
};
