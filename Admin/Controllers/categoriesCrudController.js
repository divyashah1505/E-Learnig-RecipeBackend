const { Category } = require("../../models");
const uploadToCloudinary = require("../../middleware/cloudinary");

const addCategory = async (req, res) => {
  try {
    const fileName = req.files ? Object.values(req.files) : [];
    const { Category_Name, Category_Description } = req.body;

    if (!Category_Name) {
      console.error("Category name is required.");
      return res.status(400).json({ error: "Category name is required." });
    }

    let thumbnailUrl = null;

    if (fileName.length > 0 && fileName[0].data) {
      console.log("Uploading thumbnail to Cloudinary...");
      thumbnailUrl = await uploadToCloudinary(fileName[0].data);
      if (!thumbnailUrl) {
        console.error("Error: Invalid Cloudinary upload result.");
        return res.status(500).json({
          error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid.",
        });
      }
      console.log("Thumbnail URL:", thumbnailUrl);
    } else {
      console.warn("No thumbnail file found in the request.");
    }

    const newCategory = await Category.create({
      Category_Name,
      Category_Description,
      Category_Thumbnail: thumbnailUrl || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!newCategory) {
      console.error("Failed to insert category into the database");
      return res.status(500).json({ error: "Failed to insert category into the database" });
    }

    console.log("Category added successfully");
    res.status(201).json({
      message: "Category added successfully",
      categoryId: newCategory.Category_id,
    });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
      const categories = await Category.findAll({
          order: [['createdAt', 'DESC']]
      });
      res.status(200).json(categories);
  } catch (err) {
      console.error("Error fetching categories:", err);
      res.status(500).json({ error: "Error fetching categories." });
  }
};

const editCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { Category_Name, Category_Description } = req.body;
  const fileName = req.files ? Object.values(req.files) : [];

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    let thumbnailUrl = category.Category_Thumbnail;

    if (fileName.length > 0 && fileName[0].data) {
      thumbnailUrl = await uploadToCloudinary(fileName[0].data);
      if (!thumbnailUrl) {
        console.error("Error: Invalid Cloudinary upload result.");
        return res.status(500).json({ error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid." });
      }
    } else {
      console.warn("No thumbnail file found in the request.");
    }

    if (Category_Name !== undefined && Category_Name.trim() !== '') {
      category.Category_Name = Category_Name.trim();
    }

    if (Category_Description !== undefined && Category_Description.trim() !== '') {
      category.Category_Description = Category_Description.trim();
    }

    category.Category_Thumbnail = thumbnailUrl;

    await category.save();

    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Error updating category." });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    await Category.destroy({ where: { Category_id: categoryId } });

    console.log("Category soft deleted successfully");
    res.status(200).json({ message: "Category soft deleted successfully" });
  } catch (err) {
    console.error("Error soft deleting category:", err);
    res.status(500).json({ error: "Error soft deleting category." });
  }
};

module.exports = { addCategory, getAllCategories, editCategory, deleteCategory };
// finally successfulls above crud code