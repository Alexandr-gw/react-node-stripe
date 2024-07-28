const stripe = require('stripe')('sk_test_51PcoPzRtZj5jJHBhiadIqOdURCUJwYCtIf0cwpt7wPYighDcQ92MlnE4ZJS2eUlcBoZPYWFmMEQO1DJUDkWMyYkK00ICJwlVlP');

const express = require('express');
const cors = require('cors');
const app2 = express()
app2.use(cors())
exports.createPaymentIntent = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PdMZkRtZj5jJHBhMrk1XFDy',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:8080/success`,
      cancel_url: `http://localhost:8080/cancel`,
    });

    res.json({success_url:session.url});

    // const { amount } = req.body;

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount,
    //   currency: 'usd',
    //   payment_method_types: ['card']
    // });


    // res.json({
    //   clientSecret: paymentIntent.client_secret,
    //   paymentIntentId: paymentIntent.id
    // });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
};
