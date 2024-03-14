const express = require('express');
const customerRouter = express.Router();
const authMiddleware = require('../../middleware/Auth');


// Import customer controllers
const customerLoginController = require('../../Customer/Controllers/customerLoginController'); // Adjusted path here
const customerRegistrationController =require('../../Customer/Controllers/customerRegistrationController'); // Adjusted path here

// Define customer routes
customerRouter.post('/clogin', (req, res) => {
  // Handle customer login route
  customerLoginController(req, res);
});

customerRouter.post('/register', (req, res) => {
  // Handle customer registration route
  customerRegistrationController(req, res);
});

customerRouter.get('/testData', authMiddleware, (req, res) => {
  // Handle customer registration route
  // console.log('work');
  // customerRegistrationController(req, res);
});
module.exports = customerRouter;
