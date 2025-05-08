// Customer/Routes/Paymentroutes.js
const express = require('express');
const router = express.Router();

// Corrected path with case-sensitive folder and filename
const { createCheckoutSession } = require('../Controllers/Paymentcontroller');

// POST /api/payment/create-checkout-session
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
