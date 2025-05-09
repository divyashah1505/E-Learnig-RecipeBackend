// // Recipecontroller.js
// const { Recipe } = require("../../models/");

// // Function to get all recipes by subcategory
// const getRecipesBySubcategory = async (req, res) => {
//   try {
//     const { subcategoryId } = req.params;

//     // Fetch only non-deleted recipes belonging to the specified subcategory
//     const recipes = await Recipe.findAll({
//       where: {
//         Sub_Category_id: subcategoryId, // Corrected parameter name here
//         deletedAt: null
//       }
//     });

//     // Return the recipes as JSON response
//     res.status(200).json(recipes);
//   } catch (err) {
//     // Handle errors
//     console.error("Error fetching recipes by subcategory:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Function to get only featured recipes
// const getFeaturedRecipes = async (req, res) => {
//   try {
//     const featuredRecipes = await Recipe.findAll({
//       where: {
//         deletedAt: null,  // Ensure soft-deleted recipes are ignored
//         Featured_Recipe: true  // Ensure only featured recipes are selected
//       }
//     });

//     if (!featuredRecipes || featuredRecipes.length === 0) {
//       return res.status(404).json({ message: "No featured recipes found" });
//     }

//     res.json(featuredRecipes);
//   } catch (error) {
//     console.error("Error fetching featured recipes:", error);
//     res.status(500).json({ message: "Server error while fetching featured recipes" });
//   }
// };



// // Function to get a specific recipe by ID within a specific subcategory
// const getRecipeById = async (req, res) => {
//   try {
//     const { subcategoryId, recipeId } = req.params;

//     // Fetch the specified recipe within the specified subcategory
//     const recipe = await Recipe.findOne({
//       where: {
//         Recipe_id: recipeId, // Corrected parameter name here
//         Sub_Category_id: subcategoryId,
//         deletedAt: null
//       }
//     });

//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     // Return the recipe as JSON response
//     res.status(200).json(recipe);
//   } catch (err) {
//     // Handle errors
//     console.error("Error fetching recipe by id within subcategory:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// module.exports = { getRecipesBySubcategory, getFeaturedRecipes, getRecipeById };
const { db } = require("../../models");
const Recipe = db.Recipe;

// Function to get all recipes by subcategory
const getRecipesBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    const recipes = await Recipe.findAll({
      where: {
        Sub_Category_id: subcategoryId,
        deletedAt: null, // Soft delete respected
      },
    });

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found for this subcategory." });
    }

    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error fetching recipes by subcategory:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// Function to get only featured recipes
const getFeaturedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        Featured_Recipe: true,
        deletedAt: null, // Optional but consistent
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.error('❌ Error fetching featured recipes:', error);
    res.status(500).json({ error: 'Failed to fetch Featured Recipes' });
  }
};


// Function to get a specific recipe by ID within a specific subcategory
const getRecipeById = async (req, res) => {
  try {
    const { subcategoryId, recipeId } = req.params;

    const recipe = await Recipe.findOne({
      where: {
        Recipe_id: recipeId,
        Sub_Category_id: subcategoryId,
        deletedAt: null,
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json(recipe);
  } catch (err) {
    console.error("Error fetching recipe by ID within subcategory:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

module.exports = {
  getRecipesBySubcategory,
  getFeaturedRecipes,
  getRecipeById
};
