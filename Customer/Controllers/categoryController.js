const pool = require('../../config/db');

const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT "Category_id", "Category_Name", "Category_Description", "Category_Thumbnail" FROM categories WHERE "deletedAt" IS NULL');
    const categories = result.rows;

    console.log("Fetched Categories:", categories); // Debugging log

    res.setHeader('Content-Type', 'application/json'); // Ensure JSON response
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getCategories };
