const { Pool } = require('pg');

// This will ensure we use DATABASE_URL in production and default to localhost in other environments
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Divya@localhost:5432/Recipe', // Default local config
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Use SSL only in production
});

module.exports = pool;
