const express = require('express');
const { handleCreateCheckoutSession } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-checkout-session', handleCreateCheckoutSession);

module.exports = router;
