// models/payment.js

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // Define associations if any
      Payment.belongsTo(models.Customer, { foreignKey: "id" }); 
      Payment.belongsTo(models.Plan, { foreignKey: "Planid" }); 
      Payment.belongsTo(models.Combo, { foreignKey: "comboid" }); 
    }
  }

  Payment.init(
    {
      Payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers", // Name of the referenced model
          key: "id", // Key in the referenced model
        },
      },
      Plan_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Plan", // Name of the referenced model
          key: "planid", // Key in the referenced model
        },
      },
      Combo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "combos", // Name of the referenced model
          key: "comboid", // Key in the referenced model
        },
      },
      Amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      Payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "Payment", // Ensure Sequelize uses the correct table name
      timestamps: true, // Enable timestamps to manage createdAt and updatedAt fields
    }
  );

  return Payment;
};
