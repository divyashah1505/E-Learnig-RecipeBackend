const express = require('express');
const router = express.Router();
const paymentController = require('../../Customer/Controllers/Paymentcontroller');

router.post('/payment/process', paymentController.processPayment);
router.get('/payment/success', paymentController.paymentSuccess);
router.get('/payment/cancel', paymentController.paymentCancel);

module.exports = router;
