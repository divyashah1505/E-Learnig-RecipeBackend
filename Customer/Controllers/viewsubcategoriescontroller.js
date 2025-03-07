const { Recipe, subcategory } = require("../../models");

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Check if categoryId is valid
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    // Fetch subcategories along with non-deleted recipes
    const subcategories = await subcategory.findAll({
      where: { Category_id: categoryId },
      attributes: ['Sub_Category_Name', 'Sub_Category_Description', 'Sub_Category_Thumbnail'],
      include: [{
        model: Recipe,
        where: { deletedAt: null }, // Exclude soft-deleted recipes
        required: false,  // Ensures subcategories without recipes are still included
        attributes: ['Recipe_Title', 'Recipe_Description', 'Recipe_Thumbnail']
      }]
    });

    // Check if no subcategories were found
    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found for this category ID" });
    }

    // Set the ngrok skip-browser-warning header
    res.setHeader('ngrok-skip-browser-warning', 'true');

    res.status(200).json(subcategories);
  } catch (err) {
    console.error("Error fetching subcategories by category ID:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

module.exports = { getSubCategoriesByCategoryId };
