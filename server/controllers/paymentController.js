const stripeService = require('../services/stripeService');

exports.createCheckoutSession = async (req, res) => {
  try {
    const session = await stripeService.createCheckoutSession(req.body.items);
    console.log('session----->',session)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
