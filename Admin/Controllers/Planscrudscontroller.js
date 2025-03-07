const { Plan } = require("../../models");

const addPlan = async (req, res) => {
  try {
    const { planname, description, planprice } = req.body;
    if (!planname) {
      console.error("Plan name is required.");
      return res.status(400).json({ error: "Plan name is required." });
    }

    const newPlan = await Plan.create({
      planname,
      description,
      planprice,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!newPlan) {
      console.error("Failed to insert plan into the database");
      return res.status(500).json({ error: "Failed to insert plan into the database" });
    }

    console.log("Plan added successfully");
    res.status(201).json({
      message: "Plan added successfully",
      planId: newPlan.planid,
    });
  } catch (err) {
    console.error("Error adding plan:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll({
      order: [['planid', 'ASC']]
    });
    res.status(200).json(plans);
  } catch (err) {
    console.error("Error fetching plans:", err);
    res.status(500).json({ error: "Error fetching plans." });
  }
};

const editPlan = async (req, res) => {
  const { planid } = req.params;
  const { planname, description, planprice } = req.body;

  try {
    const plan = await Plan.findByPk(planid);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found." });
    }

    if (planname !== undefined && planname.trim() !== '') {
      plan.planname = planname.trim();
    }

    if (description !== undefined && description.trim() !== '') {
      plan.description = description.trim();
    }

    if (planprice !== undefined && !isNaN(planprice)) {
      plan.planprice = planprice;
    }

    await plan.save();

    res.status(200).json({ message: "Plan updated successfully", plan });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ error: "Error updating plan." });
  }
};

const deletePlan = async (req, res) => {
  const { planId } = req.params;

  try {
    const plan = await Plan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found." });
    }

    await Plan.destroy({ where: { planid: planId } });

    console.log("Plan soft deleted successfully");
    res.status(200).json({ message: "Plan soft deleted successfully" });
  } catch (err) {
    console.error("Error soft deleting plan:", err);
    res.status(500).json({ error: "Error soft deleting plan." });
  }
};

module.exports = { addPlan, getAllPlans, editPlan, deletePlan };


