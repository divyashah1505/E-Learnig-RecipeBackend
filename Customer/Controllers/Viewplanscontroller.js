// customerPlansController.js

const { Plan } = require("../../models");

const getActivePlans = async (req, res) => {
  try {
    const activePlans = await Plan.findAll({
      where: { deletedAt: null }
    });

    res.status(200).json(activePlans);
  } catch (err) {
    console.error("Error fetching active plans:", err);
    res.status(500).json({ error: "Error fetching active plans." });
  }
};

module.exports = { getActivePlans };
