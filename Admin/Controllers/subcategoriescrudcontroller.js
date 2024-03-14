// const SubCategory = require("../../models/subcategory");
const uploadToCloudinary = require("../../middleware/cloudinary");
// const { Category } = require("../../models"); // Import the Category model
const { SubCategory,Category } = require("../../models"); // Import the Category model

const addSubcategory = async (req, res) => {
  try {
    const fileName = req.files ? Object.values(req.files) : [];

    const { Category_id, Sub_Category_Name, Sub_Category_Description } = req.body;
    console.log(req);
    // Validate required fields 
    if (!Category_id || !Sub_Category_Name) {
      console.error("Category ID and Subcategory name are required.");
      return res.status(400).json({ error: "Category ID and Subcategory name are required." });
    }

    // Check if the category exists
    const category = await Category.findByPk(Category_id);
    if (!category) {
      console.error("Category does not exist.");
      return res.status(400).json({ error: "Category does not exist." });
    }

    // Handle thumbnail upload to Cloudinary
    let thumbnailUrl = null;
    if (fileName.length > 0 && fileName[0].data) {
      console.log("Uploading thumbnail to Cloudinary...");
      thumbnailUrl = await uploadToCloudinary(fileName[0].data);
      if (!thumbnailUrl) {
        console.error("Error: Invalid Cloudinary upload result.");
        return res.status(500).json({
          error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid."
        });
      }
      console.log("Thumbnail URL:", thumbnailUrl);
    } else {
      console.warn("No thumbnail file found in the request.");
    }
    console.log('khgfcvb');
    // Create a new subcategory record
    const newSubcategory = await SubCategory.create({
      Category_id,
      Sub_Category_Name,
      Sub_Category_Description,
      Sub_Category_Thumbnail: thumbnailUrl || null,
    });
console.log();
    // Handle successful creation
    console.log("Subcategory added successfully");
    res.status(201).json({
      message: "Subcategory added successfully",
      subcategoryId: newSubcategory.Sub_Category_id,
    });
  } catch (err) {
    // Handle errors
    console.error("Error adding subcategory:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller function to get subcategories by category ID
const getSubcategoriesByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Fetch subcategories for the provided category ID
    const subcategories = await SubCategory.findAll({
      where: {
        Category_id: categoryId
      }
    });

    // Respond with the fetched subcategories
    res.status(200).json(subcategories);
  } catch (err) {
    // Handle errors
    console.error("Error fetching subcategories by category ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const editSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  const { Sub_Category_Name, Sub_Category_Description } = req.body;
  const fileName = req.files ? Object.values(req.files) : [];

  try {
    const subcategory = await SubCategory.findByPk(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found." });
    }

    let thumbnailUrl = subcategory.Sub_Category_Thumbnail;

    if (fileName.length > 0 && fileName[0].data) {
      thumbnailUrl = await uploadToCloudinary(fileName[0].data);
      if (!thumbnailUrl) {
        console.error("Error: Invalid Cloudinary upload result.");
        return res.status(500).json({ error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid." });
      }
    } else {
      console.warn("No thumbnail file found in the request.");
    }

    if (Sub_Category_Name !== undefined && Sub_Category_Name.trim() !== '') {
      subcategory.Sub_Category_Name = Sub_Category_Name.trim();
    }

    if (Sub_Category_Description !== undefined && Sub_Category_Description.trim() !== '') {
      subcategory.Sub_Category_Description = Sub_Category_Description.trim();
    }

    subcategory.Sub_Category_Thumbnail = thumbnailUrl;

    await subcategory.save();

    res.status(200).json({ message: "Subcategory updated successfully", subcategory });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ error: "Error updating subcategory." });
  }
};

const deleteSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    const subcategory = await SubCategory.findByPk(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found." });
    }

    // Soft delete the subcategory by setting the deleted_at field
    await SubCategory.destroy({ where: { Sub_Category_id: subcategoryId } });

    console.log("Subcategory soft deleted successfully");
    res.status(200).json({ message: "Subcategory soft deleted successfully" });
  } catch (err) {
    console.error("Error soft deleting subcategory:", err);
    res.status(500).json({ error: "Error soft deleting subcategory." });
  }
};

module.exports = { addSubcategory, getSubcategoriesByCategoryId, editSubcategory, deleteSubcategory };
// succssfully crud of subcategories n changes 