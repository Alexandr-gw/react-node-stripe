const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const { updateStripePriceId, updateIfEdited } = require('../services/bookService');

async function findOrCreateProduct(book) {
  const products = await stripe.products.list({ limit: 100 });
  let product = products.data.find(p => p.id === book.id);

  if (!product) {
    product = await stripe.products.create({
      id: book.id,
      name: book.title,
      description: book.description || 'No description',
      default_price_data: {
        currency: 'cad',
        unit_amount: book.price * 100,
      }
    })
    updateStripePriceId(product.id, product.default_price);
  } else {
    if (book.ifEdited) {
      product = await stripe.products.update(product.id, {
        name: book.title,
        description: book.description || 'No description',
      })
      let price = await stripe.prices.create({
        currency: 'cad',
        unit_amount: (Math.round(book.price * 100)),
        product: product.id
      })
      product = await stripe.products.update(product.id, {
        default_price: price.id,
      })
      price = await stripe.prices.update(book.stripePriceId, {
        active: false
      })
      updateStripePriceId(product.id, product.default_price);
      updateIfEdited(product.id, false);
      console.log(`---Book ${book.title} updated in Stripe API ---`)
    }
    return product;
  }

  return product;
}

async function createCheckoutSession(stripePriceId) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}?success=true`,
    cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
  });
  return session;
}

module.exports = {
  createCheckoutSession,
  findOrCreateProduct
};
