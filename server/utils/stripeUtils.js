const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function listProducts() {
  const products = await stripe.products.list({ limit: 100 });
  return products
}

module.exports = {
  listProducts
};