// server/controllers/checkoutController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { findOrCreateProduct, findOrCreatePrice } = require('../services/stripeService');

const createCheckoutSession = async (req, res) => {
  const { productName, unitAmount, currency, recurringInterval } = req.body;

  try {
    const product = await findOrCreateProduct(productName);

    const priceData = {
      currency: currency || 'usd',
      unit_amount: unitAmount,
      recurring: recurringInterval ? { interval: recurringInterval } : undefined,
    };

    const price = await findOrCreatePrice(product.id, priceData);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
