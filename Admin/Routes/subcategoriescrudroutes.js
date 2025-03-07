// const express = require('express');
// const router = express.Router();
// const subcategoriesController = require('../Controllers/subcategoriescrudcontroller');

// // Route to add a new subcategory
// router.post('/addsubcategories', subcategoriesController.addSubcategory);

// // Route to edit a subcategory
// router.put('/editsubcategories/:subcategoryId', subcategoriesController.editSubcategory);

// // Route to delete a subcategory (soft delete)
// router.delete('/deletesubcategories/:subcategoryId', subcategoriesController.deleteSubcategory);

// // Route to get subcategories by category ID
// router.get('/subcategories/:categoryId', subcategoriesController.getSubcategoriesByCategoryId);

// module.exports = router;
   


const express = require('express');
const router = express.Router();
const subcategoriesController = require('../Controllers/subcategoriescrudcontroller');

// Route to add a new subcategory
router.post('/addsubcategories', subcategoriesController.addSubcategory);

// Route to edit a subcategory
router.put('/editsubcategories/:subcategoryId', subcategoriesController.editSubcategory);

// Route to delete a subcategory (soft delete)
router.delete('/deletesubcategories/:subcategoryId', subcategoriesController.deleteSubcategory);

// Route to get subcategories by category ID
router.get('/subcategories/:categoryId', subcategoriesController.getSubcategoriesByCategoryId);

// Route to view all subcategories
router.get('/vsubcategories', subcategoriesController.getAllSubcategories);

module.exports = router;
