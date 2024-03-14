// routes/subcategoriesRoutes.js

const express = require('express');
const router = express.Router();
const { getSubCategoriesByCategoryId } = require('../../Customer/Controllers/viewsubcategoriescontroller');

// Route to fetch subcategories by category ID
router.get('/subcategories/:categoryId', getSubCategoriesByCategoryId);

module.exports = router;
