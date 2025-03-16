// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Recipe',
  password: 'Divya',
  port: 5432
});
// console.log(pool);

module.exports = pool;
