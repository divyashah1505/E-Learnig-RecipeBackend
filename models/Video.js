'use strict';

module.exports = (sequelize, DataTypes) => {
  class Video extends sequelize.Sequelize.Model {}

  Video.init({
    Video_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Video_Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Video_Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Video_Category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Video_Ingredients: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Video_Cooking_Time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Video_Nutritional_Info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Video_Thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Video_Url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Featured_Video: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Sub_Category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Video',
    tableName: 'videos',
    timestamps: true,
  });

  return Video;
};
