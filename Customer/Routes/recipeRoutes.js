const express = require("express");
const router = express.Router();
const recipeController = require("../../Customer/Controllers/recipeController");

// Route to get all recipes
router.get("/recipes/:subcategoryId", recipeController.getRecipesBySubcategory);


// Route to get only featured recipes
router.get("/recipes/featured", recipeController.getFeaturedRecipes);

module.exports = router;
