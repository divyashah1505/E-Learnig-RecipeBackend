const express = require('express');
const router = express.Router();
const comboCustomerController = require('../../Customer/Controllers/Viewcombocontroller');

// Route to get active combos for customers
router.get('/activecombos', comboCustomerController.getActiveCombos);

module.exports = router;
