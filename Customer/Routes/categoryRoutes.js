const express = require('express');
const router = express.Router();
const categoryController = require('../../Customer/Controllers/categoryController');

// Route to get all categories for customers
router.get('/viewcategories', categoryController.getCategories);

module.exports = router;
