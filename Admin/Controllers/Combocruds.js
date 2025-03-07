const { Combo } = require("../../models");
const uploadToCloudinary = require("../../middleware/cloudinary");
const addCombo = async (req, res) => {
  try {
    const fileName = req.files ? Object.values(req.files) : [];
    const { comboname, combodescription, comboprice } = req.body;

    if (!comboname) {
      console.error("Combo name is required.");
      return res.status(400).json({ error: "Combo name is required." });
    }

    let combothumbnailUrl = null;

    if (fileName.length > 0 && fileName[0].data) {
      console.log("Uploading thumbnail to Cloudinary...");
      combothumbnailUrl = await uploadToCloudinary(fileName[0].data);
      if (!combothumbnailUrl) {
        console.error("Error: Invalid Cloudinary upload result.");
        return res.status(500).json({
          error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid.",
        });
      }
      console.log("Combo Thumbnail URL:", combothumbnailUrl);
    } else {
      console.warn("No combo thumbnail file found in the request.");
    }

    const newCombo = await Combo.create({
      comboname,
      combodescription,
      combotthumbnail: combothumbnailUrl || null,
      comboprice,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!newCombo) {
      console.error("Failed to insert combo into the database");
      return res.status(500).json({ error: "Failed to insert combo into the database" });
    }

    console.log("Combo added successfully");
    res.status(201).json({
      message: "Combo added successfully",
      comboId: newCombo.comboid,
    });
  } catch (err) {
    console.error("Error adding combo:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


const editCombo = async (req, res) => {
  const { comboId } = req.params;
  const { comboname, combodescription, comboprice } = req.body;
  const fileName = req.files ? Object.values(req.files) : [];

  try {
    const combo = await Combo.findByPk(comboId);
    if (!combo) {
      return res.status(404).json({ error: "Combo not found." });
    }

    let combothumbnailUrl = combo.combotthumbnail;

    if (fileName.length > 0 && fileName[0].data) {
      combothumbnailUrl = await uploadToCloudinary(fileName[0].data);
      if (!combothumbnailUrl) {
        console.error("Error: Invalid Cloudinary upload result.");
        return res.status(500).json({ error: "Error uploading file to Cloudinary or Cloudinary upload result is invalid." });
      }
    } else {
      console.warn("No combo thumbnail file found in the request.");
    }

    if (comboname !== undefined && comboname.trim() !== '') {
      combo.comboname = comboname.trim();
    }

    if (combodescription !== undefined && combodescription.trim() !== '') {
      combo.combodescription = combodescription.trim();
    }

    combo.combotthumbnail = combothumbnailUrl;
    combo.comboprice = comboprice;

    await combo.save();

    res.status(200).json({ message: "Combo updated successfully", combo });
  } catch (error) {
    console.error("Error updating combo:", error);
    res.status(500).json({ error: "Error updating combo." });
  }
};

const getAllCombos = async (req, res) => {
  try {
    const combos = await Combo.findAll();
    res.status(200).json(combos);
  } catch (err) {
    console.error("Error fetching combos:", err);
    res.status(500).json({ error: "Error fetching combos." });
  }
};

const deleteCombo = async (req, res) => {
  const { comboId } = req.params;

  try {
    const combo = await Combo.findByPk(comboId);
    if (!combo) {
      return res.status(404).json({ error: "Combo not found." });
    }

    await Combo.destroy({ where: { comboid: comboId } });

    console.log("Combo soft deleted successfully");
    res.status(200).json({ message: "Combo soft deleted successfully" });
  } catch (err) {
    console.error("Error soft deleting combo:", err);
    res.status(500).json({ error: "Error soft deleting combo." });
  }
};

module.exports = { addCombo, editCombo, getAllCombos, deleteCombo };