// customerPlansRoutes.js

const express = require('express');
const router = express.Router();
const customerPlansController = require('../Controllers/Viewplanscontroller');

// Route to get active plans for customers
router.get('/active-plans', customerPlansController.getActivePlans);

module.exports = router;
