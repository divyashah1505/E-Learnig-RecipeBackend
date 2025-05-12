'use strict';
const { Model } = require('sequelize'); // Add this line to import Model from Sequelize

module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
      // Define association with Category
      SubCategory.belongsTo(models.Category, { foreignKey: 'Category_id' });
      // Define association with Video
      SubCategory.hasMany(models.Video, { foreignKey: 'Sub_Category_id' });
    }
  }

  SubCategory.init({
    Sub_Category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Sub_Category_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Sub_Category_Description: {
      type: DataTypes.STRING,
    },
    Sub_Category_Thumbnail: {
      type: DataTypes.STRING,
    },
    Category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SubCategory',
    tableName: 'subcategories',
    timestamps: true,
    paranoid:true
  });

  return SubCategory;
};
