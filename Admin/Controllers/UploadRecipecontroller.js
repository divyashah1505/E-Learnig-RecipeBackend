// // Import necessary modules and models
// const express = require("express");
// const uploadToCloudinary = require("../../middleware/cloudinary");
// const { Recipe, SubCategory } = require("../../models");

// // Function to add a new recipe
// const addRecipe = async (req, res) => {
//   try {
//     const fileName = req.files ? Object.values(req.files) : [];

//     const {
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,     
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Featured_Recipe,
//       Sub_Category_id
//     } = req.body;

//     // Check if the subcategory exists
//     const subcategory = await SubCategory.findByPk(Sub_Category_id);
//     if (!subcategory) {
//       return res.status(404).json({ error: "Subcategory not found." });
//     }

//     let Recipe_Thumbnail = null;
//     let Recipe_Url = null;

//     // Upload thumbnail to Cloudinary if available
//     if (fileName.length > 0 && fileName[0].data) {
//       console.log("Uploading thumbnail to Cloudinary...");
//       Recipe_Thumbnail = await uploadToCloudinary(fileName[0].data);
//       if (!Recipe_Thumbnail) {
//         console.error("Error: Invalid Cloudinary upload result.");
//         return res.status(500).json({
//           error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Thumbnail URL:", Recipe_Thumbnail);
//     } else {
//       console.warn("No thumbnail file found in the request.");
//     }

//     // Upload file for Recipe_Url to Cloudinary if available
//     if (fileName.length > 1 && fileName[1].data) {
//       console.log("Uploading file for Recipe_Url to Cloudinary...");
//       Recipe_Url = await uploadToCloudinary(fileName[1].data);
//       if (!Recipe_Url) {
//         console.error("Error: Invalid Cloudinary upload result for Recipe_Url.");
//         return res.status(500).json({
//           error: "Error uploading file for Recipe_Url to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Recipe Url:", Recipe_Url);
//     } else {
//       console.warn("No file found for Recipe_Url in the request.");
//     }

//     // Create a new recipe record
//     const newRecipe = await Recipe.create({
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Recipe_Thumbnail: Recipe_Thumbnail || null,
//       Recipe_Url: Recipe_Url || null,
//       Featured_Recipe,
//       Sub_Category_id
//     });

//     // Handle successful creation
//     console.log("Recipe added successfully");
//     res.status(201).json({
//       message: "Recipe added successfully",
//       recipeId: newRecipe.Recipe_id,
//     });
//   } catch (err) {
//     // Handle errors
//     console.error("Error adding recipe:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// // Function to update an existing recipe
// const updateRecipe = async (req, res) => {
//   try {
//     const { recipeId } = req.params; // Retrieve recipeId from request parameters
//     const fileName = req.files ? Object.values(req.files) : [];

//     // Check if the recipe exists
//     const recipe = await Recipe.findByPk(recipeId);
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found." });
//     }

//     const {
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,     
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Featured_Recipe,
//       Sub_Category_id
//     } = req.body;

//     let Recipe_Thumbnail = recipe.Recipe_Thumbnail;
//     let Recipe_Url = recipe.Recipe_Url;

//     // Upload thumbnail to Cloudinary if available
//     if (fileName.length > 0 && fileName[0].data) {
//       console.log("Uploading thumbnail to Cloudinary...");
//       Recipe_Thumbnail = await uploadToCloudinary(fileName[0].data);
//       if (!Recipe_Thumbnail) {
//         console.error("Error: Invalid Cloudinary upload result.");
//         return res.status(500).json({
//           error: "Error uploading thumbnail file to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Thumbnail URL:", Recipe_Thumbnail);
//     } else {
//       console.warn("No thumbnail file found in the request.");
//     }

//     // Check if there's a file for Recipe_Url
//     console.log(fileName);
//     const recipeUrlFile = fileName.find(file => file.data);
//     // console.log({ recipeUrl: recipeUrlFile });
//     if (recipeUrlFile) {
//       console.log("Uploading file for Recipe_Url to Cloudinary...");
//       Recipe_Url = await uploadToCloudinary(recipeUrlFile.data);
//       if (!Recipe_Url) {
//         console.error("Error: Invalid Cloudinary upload result for Recipe_Url.");
//         return res.status(500).json({
//           error: "Error uploading Recipe_Url file to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Recipe Url:", Recipe_Url);
//     } else {
//       console.warn("No file found for Recipe_Url in the request.");
//     }

//     // Update the recipe record
//     recipe.Recipe_Title = Recipe_Title || recipe.Recipe_Title;
//     recipe.Recipe_Description = Recipe_Description || recipe.Recipe_Description;
//     recipe.Recipe_Ingredients = Recipe_Ingredients || recipe.Recipe_Ingredients;
//     recipe.Recipe_Cooking_Time = Recipe_Cooking_Time || recipe.Recipe_Cooking_Time;
//     recipe.Recipe_Nutritional_Info = Recipe_Nutritional_Info || recipe.Recipe_Nutritional_Info;
//     recipe.Recipe_Thumbnail = Recipe_Thumbnail;
//     recipe.Recipe_Url = Recipe_Url;
//     recipe.Featured_Recipe = Featured_Recipe || recipe.Featured_Recipe;
//     recipe.Sub_Category_id = Sub_Category_id || recipe.Sub_Category_id;

//     await recipe.save();

//     console.log("Recipe updated successfully");
//     res.status(200).json({
//       message: "Recipe updated successfully",
//       recipeId: recipeId, // Use the recipeId from request parameters
//     });
//   } catch (err) {
//     console.error("Error updating recipe:", err);
//     res.status(500).json({ error: "Internal server error", details: err.message });
//   }
// };


// const softDeleteRecipe = async (req, res) => {
//   try {
//     const { recipeId } = req.params;
    
//     // Check if the recipe exists
//     const recipe = await Recipe.findByPk(recipeId);
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found." });
//     }

//     // Soft delete the recipe
//     await Recipe.destroy({ where: { Recipe_id: recipeId } });


//     console.log("Recipe soft deleted successfully");
//     res.status(200).json({
//       message: "Recipe soft deleted successfully",
//       recipeId: recipeId,
//     });
//   } catch (err) {
//     console.error("Error soft deleting recipe:", err);
//     res.status(500).json({ error: "Internal server error", details: err.message });
//   }
// };

// module.exports = { addRecipe, updateRecipe, softDeleteRecipe };




// Import necessary modules and models
// const express = require("express");
// const uploadToCloudinary = require("../../middleware/cloudinary");
// const { Recipe, SubCategory } = require("../../models");

// Function to add a new recipe
// const addRecipe = async (req, res) => {
//   try {
//     const fileName = req.files ? Object.values(req.files) : [];

//     const {
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,     
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Featured_Recipe,
//       Sub_Category_id
//     } = req.body;

//     // Check if the subcategory exists
//     const subcategory = await SubCategory.findByPk(Sub_Category_id);
//     if (!subcategory) {
//       return res.status(404).json({ error: "Subcategory not found." });
//     }

//     let Recipe_Thumbnail = null;
//     let Recipe_Url = null;

//     // Upload thumbnail to Cloudinary if available
//     if (fileName.length > 0 && fileName[0].data) {
//       console.log("Uploading thumbnail to Cloudinary...");
//       Recipe_Thumbnail = await uploadToCloudinary(fileName[0].data);
//       if (!Recipe_Thumbnail) {
//         console.error("Error: Invalid Cloudinary upload result.");
//         return res.status(500).json({
//           error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Thumbnail URL:", Recipe_Thumbnail);
//     } else {
//       console.warn("No thumbnail file found in the request.");
//     }

//     // Upload file for Recipe_Url to Cloudinary if available
//     if (fileName.length > 1 && fileName[1].data) {
//       console.log("Uploading file for Recipe_Url to Cloudinary...");
//       Recipe_Url = await uploadToCloudinary(fileName[1].data);
//       if (!Recipe_Url) {
//         console.error("Error: Invalid Cloudinary upload result for Recipe_Url.");
//         return res.status(500).json({
//           error: "Error uploading file for Recipe_Url to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Recipe Url:", Recipe_Url);
//     } else {
//       console.warn("No file found for Recipe_Url in the request.");
//     }

//     // Create a new recipe record
//     const newRecipe = await Recipe.create({
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Recipe_Thumbnail: Recipe_Thumbnail || null,
//       Recipe_Url: Recipe_Url || null,
//       Featured_Recipe,
//       Sub_Category_id
//     });

//     // Handle successful creation
//     console.log("Recipe added successfully");
//     res.status(201).json({
//       message: "Recipe added successfully",
//       recipeId: newRecipe.Recipe_id,
//     });
//   } catch (err) {
//     // Handle errors
//     console.error("Error adding recipe:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// const express = require("express");
// const uploadToCloudinary = require("../../middleware/cloudinary");
// const { Recipe, SubCategory } = require("../../models");

// Function to add a new recipe







// // Import necessary modules and models
// const express = require("express");
// const uploadToCloudinary = require("../../middleware/cloudinary");
// const { Recipe, SubCategory } = require("../../models");

// const addRecipe = async (req, res) => {
//   try {
//     // Convert Sub_Category_id to an integer and validate
//     const Sub_Category_id = parseInt(req.body.Sub_Category_id, 10);
//     if (isNaN(Sub_Category_id)) {
//       return res.status(400).json({ error: "Sub_Category_id must be a valid integer." });
//     }

//     const {
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,     
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Featured_Recipe,
//     } = req.body;

//     // Check if the subcategory exists
//     const subcategory = await SubCategory.findByPk(Sub_Category_id);
//     if (!subcategory) {
//       return res.status(404).json({ error: "Subcategory not found." });
//     }

//     let Recipe_Thumbnail = null;
//     let Recipe_Url = null;
//     const fileName = req.files ? Object.values(req.files) : [];

//     // Upload thumbnail to Cloudinary if available
//     if (fileName.length > 0 && fileName[0].data) {
//       Recipe_Thumbnail = await uploadToCloudinary(fileName[0].data);
//       if (!Recipe_Thumbnail) {
//         return res.status(500).json({
//           error: "Error uploading thumbnail to Cloudinary.",
//         });
//       }
//     }

//     // Upload video to Cloudinary if available
//     if (fileName.length > 1 && fileName[1].data) {
//       Recipe_Url = await uploadToCloudinary(fileName[1].data);
//       if (!Recipe_Url) {
//         return res.status(500).json({
//           error: "Error uploading video to Cloudinary.",
//         });
//       }
//     }

//     // Create a new recipe record
//     const newRecipe = await Recipe.create({
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Recipe_Thumbnail,
//       Recipe_Url,
//       Featured_Recipe: Featured_Recipe === 'true',
//       Sub_Category_id
//     });

//     res.status(201).json({
//       message: "Recipe added successfully",
//       recipe: newRecipe,
//     });

//   } catch (err) {
//     console.error("Error adding recipe:", err);
//     res.status(500).json({ error: "Internal server error", details: err.message });
//   }
// };


// // Function to update an existing recipe
// const updateRecipe = async (req, res) => {
//   try {
//     const { recipeId } = req.params; // Retrieve recipeId from request parameters
//     const fileName = req.files ? Object.values(req.files) : [];

//     // Check if the recipe exists
//     const recipe = await Recipe.findByPk(recipeId);
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found." });
//     }

//     const {
//       Recipe_Title,
//       Recipe_Description,
//       Recipe_Ingredients,     
//       Recipe_Cooking_Time,
//       Recipe_Nutritional_Info,
//       Featured_Recipe,
//       Sub_Category_id
//     } = req.body;

//     let Recipe_Thumbnail = recipe.Recipe_Thumbnail;
//     let Recipe_Url = recipe.Recipe_Url;

//     // Upload thumbnail to Cloudinary if available
//     if (fileName.length > 0 && fileName[0].data) {
//       console.log("Uploading thumbnail to Cloudinary...");
//       Recipe_Thumbnail = await uploadToCloudinary(fileName[0].data);
//       if (!Recipe_Thumbnail) {
//         console.error("Error: Invalid Cloudinary upload result.");
//         return res.status(500).json({
//           error: "Error uploading thumbnail file to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Thumbnail URL:", Recipe_Thumbnail);
//     } else {
//       console.warn("No thumbnail file found in the request.");
//     }

//     // Check if there's a file for Recipe_Url
//     console.log(fileName);
//     const recipeUrlFile = fileName.find(file => file.data);
//     // console.log({ recipeUrl: recipeUrlFile });
//     if (recipeUrlFile) {
//       console.log("Uploading file for Recipe_Url to Cloudinary...");
//       Recipe_Url = await uploadToCloudinary(recipeUrlFile.data);
//       if (!Recipe_Url) {
//         console.error("Error: Invalid Cloudinary upload result for Recipe_Url.");
//         return res.status(500).json({
//           error: "Error uploading Recipe_Url file to Cloudinary or Cloudinary upload result is invalid.",
//         });
//       }
//       console.log("Recipe Url:", Recipe_Url);
//     } else {
//       console.warn("No file found for Recipe_Url in the request.");
//     }

//     // Update the recipe record
//     recipe.Recipe_Title = Recipe_Title || recipe.Recipe_Title;
//     recipe.Recipe_Description = Recipe_Description || recipe.Recipe_Description;
//     recipe.Recipe_Ingredients = Recipe_Ingredients || recipe.Recipe_Ingredients;
//     recipe.Recipe_Cooking_Time = Recipe_Cooking_Time || recipe.Recipe_Cooking_Time;
//     recipe.Recipe_Nutritional_Info = Recipe_Nutritional_Info || recipe.Recipe_Nutritional_Info;
//     recipe.Recipe_Thumbnail = Recipe_Thumbnail;
//     recipe.Recipe_Url = Recipe_Url;
//     recipe.Featured_Recipe = Featured_Recipe || recipe.Featured_Recipe;
//     recipe.Sub_Category_id = Sub_Category_id || recipe.Sub_Category_id;

//     await recipe.save();

//     console.log("Recipe updated successfully");
//     res.status(200).json({
//       message: "Recipe updated successfully",
//       recipeId: recipeId, // Use the recipeId from request parameters
//     });
//   } catch (err) {
//     console.error("Error updating recipe:", err);
//     res.status(500).json({ error: "Internal server error", details: err.message });
//   }
// };


// const softDeleteRecipe = async (req, res) => {
//   try {
//     const { recipeId } = req.params;
    
//     // Check if the recipe exists
//     const recipe = await Recipe.findByPk(recipeId);
//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found." });
//     }

//     // Soft delete the recipe
//     await Recipe.destroy({ where: { Recipe_id: recipeId } });


//     console.log("Recipe soft deleted successfully");
//     res.status(200).json({
//       message: "Recipe soft deleted successfully",
//       recipeId: recipeId,
//     });
//   } catch (err) {
//     console.error("Error soft deleting recipe:", err);
//     res.status(500).json({ error: "Internal server error", details: err.message });
//   }
// };

// module.exports = { addRecipe, updateRecipe, softDeleteRecipe };








// Import necessary modules and models
const express = require("express");
const uploadToCloudinary = require("../../middleware/cloudinary");
const { Recipe, SubCategory } = require("../../models");



// Function to add a new recipe
const addRecipe = async (req, res) => {
  try {
    // Convert Sub_Category_id to an integer and validate
    const Sub_Category_id = parseInt(req.body.Sub_Category_id, 10);
    if (isNaN(Sub_Category_id)) {
      return res.status(400).json({ error: "Sub_Category_id must be a valid integer." });
    }

    const {
      Recipe_Title,
      Recipe_Description,
      Recipe_Ingredients,     
      Recipe_Cooking_Time,
      Recipe_Nutritional_Info,
      Featured_Recipe,
    } = req.body;

    // Check if the subcategory exists
    const subcategory = await SubCategory.findByPk(Sub_Category_id);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found." });
    }

    let Recipe_Thumbnail = null;
    let Recipe_Url = null;
    const fileName = req.files ? Object.values(req.files) : [];

    // Upload thumbnail to Cloudinary if available
    if (fileName.length > 0 && fileName[0].data) {
      Recipe_Thumbnail = await uploadToCloudinary(fileName[0].data);
      if (!Recipe_Thumbnail) {
        return res.status(500).json({
          error: "Error uploading thumbnail to Cloudinary.",
        });
      }
    }

    // Upload video to Cloudinary if available
    if (fileName.length > 1 && fileName[1].data) {
      Recipe_Url = await uploadToCloudinary(fileName[1].data);
      if (!Recipe_Url) {
        return res.status(500).json({
          error: "Error uploading video to Cloudinary.",
        });
      }
    }

    // Create a new recipe record
    const newRecipe = await Recipe.create({
      Recipe_Title,
      Recipe_Description,
      Recipe_Ingredients,
      Recipe_Cooking_Time,
      Recipe_Nutritional_Info,
      Recipe_Thumbnail,
      Recipe_Url,
      Featured_Recipe: Featured_Recipe === 'true',
      Sub_Category_id
    });

    res.status(201).json({
      message: "Recipe added successfully",
      recipe: newRecipe,
    });

  } catch (err) {
    console.error("Error adding recipe:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};


// Function to update an existing recipe
const updateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params; // Retrieve recipeId from request parameters
    const fileName = req.files ? Object.values(req.files) : [];

    // Check if the recipe exists
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    const {
      Recipe_Title,
      Recipe_Description,
      Recipe_Ingredients,     
      Recipe_Cooking_Time,
      Recipe_Nutritional_Info,
      Featured_Recipe,
      Sub_Category_id
    } = req.body;

    let Recipe_Thumbnail = recipe.Recipe_Thumbnail;
    let Recipe_Url = recipe.Recipe_Url;

    // Upload thumbnail to Cloudinary if available
    if (fileName.length > 0 && fileName[0].data) {
      console.log("Uploading thumbnail to Cloudinary...");
      Recipe_Thumbnail = await uploadToCloudinary(fileName[0].data);
      if (!Recipe_Thumbnail) {
        console.error("Error: Invalid Cloudinary upload result.");
        return res.status(500).json({
          error: "Error uploading thumbnail file to Cloudinary or Cloudinary upload result is invalid.",
        });
      }
      console.log("Thumbnail URL:", Recipe_Thumbnail);
    } else {
      console.warn("No thumbnail file found in the request.");
    }

    // Check if there's a file for Recipe_Url
    console.log(fileName);
    const recipeUrlFile = fileName.find(file => file.data);
    // console.log({ recipeUrl: recipeUrlFile });
    if (recipeUrlFile) {
      console.log("Uploading file for Recipe_Url to Cloudinary...");
      Recipe_Url = await uploadToCloudinary(recipeUrlFile.data);
      if (!Recipe_Url) {
        console.error("Error: Invalid Cloudinary upload result for Recipe_Url.");
        return res.status(500).json({
          error: "Error uploading Recipe_Url file to Cloudinary or Cloudinary upload result is invalid.",
        });
      }
      console.log("Recipe Url:", Recipe_Url);
    } else {
      console.warn("No file found for Recipe_Url in the request.");
    }

    // Update the recipe record
    recipe.Recipe_Title = Recipe_Title || recipe.Recipe_Title;
    recipe.Recipe_Description = Recipe_Description || recipe.Recipe_Description;
    recipe.Recipe_Ingredients = Recipe_Ingredients || recipe.Recipe_Ingredients;
    recipe.Recipe_Cooking_Time = Recipe_Cooking_Time || recipe.Recipe_Cooking_Time;
    recipe.Recipe_Nutritional_Info = Recipe_Nutritional_Info || recipe.Recipe_Nutritional_Info;
    recipe.Recipe_Thumbnail = Recipe_Thumbnail;
    recipe.Recipe_Url = Recipe_Url;
    recipe.Featured_Recipe = Featured_Recipe || recipe.Featured_Recipe;
    recipe.Sub_Category_id = Sub_Category_id || recipe.Sub_Category_id;

    await recipe.save();

    console.log("Recipe updated successfully");
    res.status(200).json({
      message: "Recipe updated successfully",
      recipeId: recipeId, // Use the recipeId from request parameters
    });
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};


const softDeleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    // Check if the recipe exists
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    // Soft delete the recipe
    await Recipe.destroy({ where: { Recipe_id: recipeId } });


    console.log("Recipe soft deleted successfully");
    res.status(200).json({
      message: "Recipe soft deleted successfully",
      recipeId: recipeId,
    });
  } catch (err) {
    console.error("Error soft deleting recipe:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();

    res.status(200).json({ recipes });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

module.exports = { addRecipe, updateRecipe, softDeleteRecipe ,getAllRecipes};