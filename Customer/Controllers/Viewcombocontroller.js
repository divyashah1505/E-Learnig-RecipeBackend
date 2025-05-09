
const { Combo } = require("../../models");

const getActiveCombos = async (req, res) => {
  try {
    const combos = await Combo.findAll({
      where: { Combo_Status: true }
    });
    res.status(200).json(combos);
  } catch (error) {
    console.error('❌ Error fetching active combos:', error);
    res.status(500).json({ error: 'Failed to fetch active combos' });
  }
};

module.exports = { getActiveCombos };
