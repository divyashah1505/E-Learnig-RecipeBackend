const express = require('express');
const router = express.Router();
const categoriesController = require('../Controllers/categoriesCrudController');

// Route to add a new category
router.post('/acategories', categoriesController.addCategory);

// Route to get all categories
router.get('/vcategories', categoriesController.getAllCategories);

// Route to edit a category
router.put('/editcategories/:categoryId', categoriesController.editCategory);

// Route to soft delete a category
router.delete('/dcategories/:categoryId', categoriesController.deleteCategory);

module.exports = router;
