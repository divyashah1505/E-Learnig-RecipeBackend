// // Reciperoutes.js 
// const express = require("express");
// const router = express.Router();
// const recipeController = require("../../Customer/Controllers/recipeController");

// // Route to get all recipes by subcategory
// router.get("/recipes/subcategory/:subcategoryId", recipeController.getRecipesBySubcategory);

// // Route to get a specific recipe by ID within a specific subcategory
// router.get("/recipes/subcategory/:subcategoryId/:recipeId", recipeController.getRecipeById);

// // Route to get only featured recipes
// router.get("/recipes/featured", getFeaturedRecipes);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const { getRecipesBySubcategory, getFeaturedRecipes, getRecipeById } = require("../Controllers/recipeController");

// // Route to get all recipes by subcategory
// router.get("/recipes/subcategory/:subcategoryId", getRecipesBySubcategory);

// // Route to get a specific recipe by ID within a specific subcategory
// router.get("/recipes/subcategory/:subcategoryId/:recipeId", getRecipeById);

// // Route to get only featured recipes
// router.get("/recipes/featured", getFeaturedRecipes);

// module.exports = router;
// Reciperoutes.js 
const express = require("express");
const router = express.Router();
const recipeController = require("../../Customer/Controllers/recipeController");

// Route to get all recipes by subcategory
router.get("/recipes/subcategory/:subcategoryId", recipeController.getRecipesBySubcategory);

// Route to get a specific recipe by ID within a specific subcategory
router.get("/recipes/subcategory/:subcategoryId/:recipeId", recipeController.getRecipeById);

// Route to get only featured recipes
router.get("/recipes/featured", recipeController.getFeaturedRecipes);

module.exports = router;

