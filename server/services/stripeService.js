const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { updateStripePriceId, updateUpdatedOn } = require('../services/bookService');
const { listProducts } = require('../utils/stripeUtils');

async function findProduct(book) {
  try {
    const products = await listProducts();
    return products.data.find(p => p.id === book.id);
  } catch (error) {
    console.error('Error finding product in Stripe:', error);
    throw new Error('Could not find product in Stripe');
  }
}

async function addProduct(book) {
  if (book) {
    try {
      console.log('book--->', book);
      return product = await stripe.products.create({
        id: book.id,
        name: book.title,
        description: book.description || 'No description',
        default_price_data: {
          currency: 'cad',
          unit_amount: book.price * 100,
        }
      });
    } catch (error) {
      console.error('Error creating product in Stripe:', error);
      throw new Error('Could not create product in Stripe');
    }
  } else {
    console.log('Error occur while adding book in Stripe API');
  }
}

async function updateProduct(book) {//Need to separate add new product and update product. See stripe docs for how pull list of items
  if (book.updatedOn) {
    product = await stripe.products.update(product.id, {
      name: book.title,
      description: book.description || 'No description',
    });
    const price = await stripe.prices.create({
      currency: 'cad',
      unit_amount: Math.round(book.price * 100),
      product: product.id
    });
    await stripe.products.update(product.id, {
      default_price: price.id,
    });
    await stripe.prices.update(book.stripePriceId, {
      active: false
    });
    await updateStripePriceId(product.id, price.id);
    await updateUpdatedOn(product.id, false);
    console.log(`---Book ${book.title} updated in Stripe API ---`);
  } else {
    console.log('Error occur while updating book in Stripe API');
  }
}

async function deleteProduct(id) {
  const products = await listProducts();
  const product = products.data.find(p => p.id === id);
  if (product) {
    await stripe.products.del(product.id)
  }
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
    success_url: `${process.env.CLIENT_URL}/SuccessPage`,
    cancel_url: `${process.env.CLIENT_URL}/CancelPage`,
  });
  return session;
}

module.exports = {
  createCheckoutSession,
  findProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
