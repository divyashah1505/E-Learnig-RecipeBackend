// plansCrudController.js

// const { Plans } = require("../../models");
const { Plan } = require("../../models");

const addPlan = async (req, res) => {
  try {
    console.log('hello');
    console.log(req.body);
    const { planname, description, planprice } = req.body;
    console.log('jasdgcvs');
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
      planId: newPlan.Plan_id,
    });
  } catch (err) {
    console.error("Error adding plan:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.status(200).json(plans);
  } catch (err) {
    console.error("Error fetching plans:", err);
    res.status(500).json({ error: "Error fetching plans." });
  }
};

const editPlan = async (req, res) => {
  const { planid } = req.params;
  const { planname, Plan_Description, Price } = req.body;

  try {
    const plan = await Plan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found." });
    }

    if (Plan_Name !== undefined && Plan_Name.trim() !== '') {
      plan.Plan_Name = Plan_Name.trim();
    }

    if (Plan_Description !== undefined && Plan_Description.trim() !== '') {
      plan.Plan_Description = Plan_Description.trim();
    }

    if (Price !== undefined && !isNaN(Price)) {
      plan.Price = Price;
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

    await Plan.destroy({ where: { Plan_id: planId } });

    console.log("Plan soft deleted successfully");
    res.status(200).json({ message: "Plan soft deleted successfully" });
  } catch (err) {
    console.error("Error soft deleting plan:", err);
    res.status(500).json({ error: "Error soft deleting plan." });
  }
};

module.exports = { addPlan, getAllPlans, editPlan, deletePlan };
