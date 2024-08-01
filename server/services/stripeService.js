const stripe = require('../config/stripe');

exports.createCheckoutSession = async (req, res) => {
  const { priceId, quantity } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Use the provided Price ID
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
    });

    return session
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
