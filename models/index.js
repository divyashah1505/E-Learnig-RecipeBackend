// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');

// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// async function init() {
//   try {
//     await sequelize.sync({ force: false });
//     console.log('All models were synchronized successfully.');
//   } catch (error) {
//     console.error('An error occurred while synchronizing models:', error);
//     throw error;
//   }
// }
// init();
// module.exports = db;
'use strict';

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
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Existing models
const Customer = require('../models/Customer')(sequelize, Sequelize);
const Category = require('../models/Category')(sequelize, Sequelize);
const SubCategory = require('./subcategory')(sequelize, Sequelize); // Import SubCategory before using it
const Video = require('./Video')(sequelize, Sequelize);
const Recipe = require('./Recipe')(sequelize, Sequelize);
const Combo = require('./Combo')(sequelize, Sequelize);
const Plan = require('./Plans')(sequelize, Sequelize);
const payment = require('./Payments')(sequelize, Sequelize);
// Add associations if any
Category.hasMany(SubCategory, { foreignKey: 'Category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'Category_id' });

SubCategory.hasMany(Video, { foreignKey: 'Sub_Category_id' });
Video.belongsTo(SubCategory, { foreignKey: 'Sub_Category_id' });

db.Customer = Customer;
db.Category = Category;
db.SubCategory = SubCategory;
db.Video = Video;
db.Recipe = Recipe;
db.Combo = Combo;
db.Plan = Plan;
db.payment= payment;

// Synchronize models
async function init() {
  try {
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('An error occurred while synchronizing models:', error);
    throw error;
  }
}
init();

module.exports = db;