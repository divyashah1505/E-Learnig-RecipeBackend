// models/index.js
'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    dialectOptions: config.dialectOptions,
  });
}

// Import models
db.Customer = require('./Customer')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);
db.SubCategory = require('./subcategory')(sequelize, Sequelize);
db.Video = require('./Video')(sequelize, Sequelize);
db.Recipe = require('./Recipe')(sequelize, Sequelize);
db.Combo = require('./Combo')(sequelize, Sequelize);
db.Plan = require('./Plans')(sequelize, Sequelize);
db.Payment = require('./Payments')(sequelize, Sequelize); // Ensure correct casing

// Define associations
db.Category.hasMany(db.SubCategory, { foreignKey: 'Category_id' });
db.SubCategory.belongsTo(db.Category, { foreignKey: 'Category_id' });

db.SubCategory.hasMany(db.Video, { foreignKey: 'Sub_Category_id' });
db.Video.belongsTo(db.SubCategory, { foreignKey: 'Sub_Category_id' });

db.SubCategory.hasMany(db.Recipe, { foreignKey: 'Sub_Category_id' });
db.Recipe.belongsTo(db.SubCategory, { foreignKey: 'Sub_Category_id' });

// Sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync and authenticate
async function init() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    await sequelize.sync({ force: false });
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    throw error;
  }
}
init();

module.exports = db;
