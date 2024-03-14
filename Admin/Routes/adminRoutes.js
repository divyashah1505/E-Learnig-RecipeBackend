const express = require('express');
const adminRouter = express.Router();

// Import admin controllers
const adminLoginController = require('C:/Users/DIVYA B SHAH/Desktop/Recipebackend/Admin/Controllers/adminlogincontroller.js');
const categoriesCRUDController = require('C:/Users/DIVYA B SHAH/Desktop/Recipebackend/Admin/Controllers/categoriesCrudController.js'); // Corrected path
const categoriesVideoCRUDController = require('../../Admin/Controllers/categoriesVideoCrudController'); // Adjusted path here
const seederAdminController = require('../Controllers/seederAdminController'); // Updated path here

// Define admin routes
adminRouter.post('/login', (req, res) => {
  // Handle admin login route
  adminLoginController(req, res);
});

adminRouter.get('/categories', (req, res) => {
  // Handle categories route
  categoriesCRUDController(req, res);
});

adminRouter.get('/categories-video', (req, res) => {
  // Handle categories video route
  categoriesVideoCRUDController(req, res);
});

adminRouter.get('/seeder', (req, res) => {
  // Handle seeder route
  seederAdminController(req, res);
});

module.exports = adminRouter;
