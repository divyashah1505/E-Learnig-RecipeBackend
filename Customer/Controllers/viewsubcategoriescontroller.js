const { Recipe } = require("../../models");

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const subcategories = await subcategory.findAll({
      where: {
        Category_id: categoryId
      },
      attributes: ['Sub_Category_Name', 'Sub_Category_Description', 'Sub_Category_Thumbnail'],
      include: [{
        model: Recipe,
        where: {
          deletedAt: null // Filter out recipes where deletedAt is not null
        },
        attributes: ['Recipe_Title', 'Recipe_Description', 'Recipe_Thumbnail'] // Adjust attributes as needed
      }]
    });

    res.status(200).json(subcategories);
  } catch (err) {
    console.error("Error fetching subcategories by category ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getSubCategoriesByCategoryId };
