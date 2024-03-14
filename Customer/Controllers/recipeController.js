const { Recipe } = require("../../models");

// Function to get all recipes
const getRecipesBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    // Fetch only non-deleted recipes belonging to the specified subcategory
    const recipes = await Recipe.findAll({
      where: {
        Sub_Category_id: subcategoryId,
        deletedAt: null
      }
    });

    // Return the recipes as JSON response
    res.status(200).json(recipes);
  } catch (err) {
    // Handle errors
    console.error("Error fetching recipes by subcategory:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get only featured recipes
const getFeaturedRecipes = async (req, res) => {
  try {
    // Fetch only non-deleted recipes from the database where Featured_Recipe is true
    const featuredRecipes = await Recipe.findAll({
      where: {
        deletedAt: null,
        Featured_Recipe: true
      }
    });

    // Return the non-deleted featured recipes as JSON response
    res.status(200).json(featuredRecipes);
  } catch (err) {
    // Handle errors
    console.error("Error fetching featured recipes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getRecipesBySubcategory, getFeaturedRecipes };
