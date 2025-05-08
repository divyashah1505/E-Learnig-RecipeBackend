'use strict';

require('dotenv').config(); // Load .env

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Initialize Sequelize with environment variable or fallback config
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
const Customer = require('./Customer')(sequelize, Sequelize);
const Category = require('./Category')(sequelize, Sequelize);
const SubCategory = require('./subcategory')(sequelize, Sequelize);
const Video = require('./Video')(sequelize, Sequelize);
const Recipe = require('./Recipe')(sequelize, Sequelize);
const Combo = require('./Combo')(sequelize, Sequelize);
const Plan = require('./Plans')(sequelize, Sequelize);
const Payment = require('./Payments')(sequelize, Sequelize);

// Define associations
Category.hasMany(SubCategory, { foreignKey: 'Category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'Category_id' });

SubCategory.hasMany(Video, { foreignKey: 'Sub_Category_id' });
Video.belongsTo(SubCategory, { foreignKey: 'Sub_Category_id' });

// Register models
db.Customer = Customer;
db.Category = Category;
db.SubCategory = SubCategory;
db.Video = Video;
db.Recipe = Recipe;
db.Combo = Combo;
db.Plan = Plan;
db.Payment = Payment;

// Add Sequelize instance to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync models
async function init() {
  try {
    await sequelize.sync({ force: false }); // Set to true only if you want to drop and recreate tables
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
    throw error;
  }
}
init();

module.exports = { db };
