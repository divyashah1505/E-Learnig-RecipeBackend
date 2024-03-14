'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Define association with SubCategory
      Category.hasMany(models.SubCategory, { foreignKey: 'Category_id' });
    }
  }

  Category.init({
    Category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Category_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Category_Description: {
      type: DataTypes.STRING,
    },
    Category_Thumbnail: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    paranoid:true
  });

  return Category;
};