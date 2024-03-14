const express = require('express');
const router = express.Router(); // Create an Express router

const adminLoginController = require('../Controllers/adminlogincontroller'); // Import the controller

// Define the login route
router.post('/login', adminLoginController);

module.exports = router; // Export the router
