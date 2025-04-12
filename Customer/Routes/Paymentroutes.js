// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/paymentController');

// POST /api/payment/create-checkout-session
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
