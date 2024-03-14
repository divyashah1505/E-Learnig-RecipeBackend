// plansCrudRoutes.js

const express = require('express');
const router = express.Router();
const plansController = require('../Controllers/Planscrudscontroller');

// Route to add a new plan
router.post('/aplans', plansController.addPlan);

// Route to get all plans
router.get('/vplans', plansController.getAllPlans);

// Route to edit a plan
router.put('/editplans/:planId', plansController.editPlan);

// Route to soft delete a plan
router.delete('/dplans/:planId', plansController.deletePlan);

module.exports = router;
