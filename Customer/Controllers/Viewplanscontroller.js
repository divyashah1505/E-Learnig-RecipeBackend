// customerPlansController.js

const { Plan } = require("../../models");
const getActivePlans = async (req, res) => {
  try {
    const plans = await Plan.findAll({
      where: { Plan_Status: true }
    });
    res.status(200).json(plans);
  } catch (error) {
    console.error('❌ Error fetching active plans:', error);
    res.status(500).json({ error: 'Failed to fetch active plans' });
  }
};

module.exports = { getActivePlans };
