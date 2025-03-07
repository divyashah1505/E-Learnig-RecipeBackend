// const express = require('express');
// const router = express.Router();
// const recipeController = require('../Controllers/UploadRecipecontroller');

// // Route to add a new recipe
// router.post('/uploadrecipe', recipeController.addRecipe);

// // Route to update an existing recipe
// router.put("/recipes/:recipeId", async (req, res) => {
//   await recipeController.updateRecipe(req, res); // Update here
// });

// // Route to soft delete an existing recipe
// router.delete("/recipes/:recipeId", async (req, res) => {
//   await recipeController.softDeleteRecipe(req, res);
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const recipeController = require('../Controllers/UploadRecipecontroller');

// // Route to add a new recipe
// router.post('/uploadrecipe', recipeController.addRecipe);

// // Route to update an existing recipe
// router.put("/recipes/:recipeId", async (req, res) => {
//   await recipeController.updateRecipe(req, res); // Update here
// });

// // Route to soft delete an existing recipe
// router.delete("/recipes/:recipeId", async (req, res) => {
//   await recipeController.softDeleteRecipe(req, res);
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const recipeController = require('../Controllers/UploadRecipecontroller');

// Route to add a new recipe
router.post('/uploadrecipe', recipeController.addRecipe);

// Route to update an existing recipe
router.put("/recipes/:recipeId", async (req, res) => {
  await recipeController.updateRecipe(req, res); // Update here
});

router.get("/vrecipes", recipeController.getAllRecipes);


// Route to soft delete an existing recipe
router.delete("/recipes/:recipeId", async (req, res) => {
  await recipeController.softDeleteRecipe(req, res);
});

module.exports = router;