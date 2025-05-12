// models/Plan.js
'use strict';
const {  Model } = require('sequelize');
// const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) => {
    class Plan extends Model {
      static associate(models) {
        // Define associations if any
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
}, {
  sequelize,
  modelName: 'Plan',
  tableName: 'Plan', 
  timestamps: true, 
  paranoid: true,
});
return Plan;
};