
const { Combo } = require("../../models");

const getActiveCombos = async (req, res) => {
  try {
    // Find all combos where deletedAt is null
    const combos = await Combo.findAll({
      where: {
        deletedAt: null
      }
    });

    res.status(200).json(combos);
  } catch (err) {
    console.error("Error fetching active combos:", err);
    res.status(500).json({ error: "Error fetching active combos." });
  }
};

module.exports = { getActiveCombos };
