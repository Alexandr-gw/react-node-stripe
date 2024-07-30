const stripe = require('stripe')('sk_test_51PcoPzRtZj5jJHBhiadIqOdURCUJwYCtIf0cwpt7wPYighDcQ92MlnE4ZJS2eUlcBoZPYWFmMEQO1DJUDkWMyYkK00ICJwlVlP');

const express = require('express');
const cors = require('cors');
const app2 = express()
app2.use(cors())
exports.createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency,
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
};
