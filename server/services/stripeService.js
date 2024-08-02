const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function findOrCreateProduct(name) {
  const products = await stripe.products.list({ limit: 100 });
  let product = products.data.find(p => p.name === name);

  if (!product) {
    product = await stripe.products.create({ name });
  }

  return product;
}

async function findOrCreatePrice(productId, priceData) {
  const prices = await stripe.prices.list({ product: productId });

  let price = prices.data.find(p => p.unit_amount === priceData.unit_amount && p.currency === priceData.currency);

  if (!price) {
    price = await stripe.prices.create({
      ...priceData,
      product: productId,
    });
  }

  return price;
}

module.exports = {
  findOrCreateProduct,
  findOrCreatePrice,
};
