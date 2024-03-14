const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // Define associations if any
    }
  }

  Recipe.init({
    Recipe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Recipe_Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Recipe_Description: {
      type: DataTypes.STRING(255),
    },
    Recipe_Ingredients: {
      type: DataTypes.STRING(255),
    },
    Recipe_Cooking_Time: {
      type: DataTypes.INTEGER,
    },
    Recipe_Nutritional_Info: {
      type: DataTypes.STRING(255),
    },
    Recipe_Thumbnail: {
      type: DataTypes.STRING(255),
    },
    Recipe_Url: {
      type: DataTypes.STRING(255),
    },
    Featured_Recipe: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Sub_Category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Recipe',
    tableName: 'Recipe', // Ensure Sequelize uses the correct table name
    timestamps: true ,// Enable timestamps to manage createdAt and updatedAt fields
    paranoid:true
  });

  return Recipe;
};
