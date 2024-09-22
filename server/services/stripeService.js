const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { updateStripePriceId, updateUpdatedOn, getBooks } = require('../services/bookService');
const { listProducts } = require('../utils/stripeUtils');
const { v4: uuidv4 } = require('uuid');

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
  if (!book) {
    throw new Error('Book data is required');
  }
  book.id = uuidv4();
  try {
    const product = await stripe.products.create({
      id: book.id,
      name: book.title,
      description: book.description || 'No description',
      default_price_data: {
        currency: 'cad',
        unit_amount: Math.round(book.price * 100).toFixed(0),
      }
    });
    return product
  } catch (error) {
    console.error('Error creating product in Stripe:', error);
    return null
  }
}

async function updateProduct(id, book) {
  if (book) {
    const product = await stripe.products.update(id, {
      name: book.title,
      description: book.description || 'No description',
    });
    const price = await stripe.prices.create({
      currency: 'cad',
      unit_amount: Math.round(book.price * 100).toFixed(0),
      product: product.id
    });
    await stripe.products.update(product.id, {
      default_price: price.id,
    });
    const books = await getBooks();
    const oldPriceId = books.find(b => b.id === id).stripePriceId;
    await stripe.prices.update(oldPriceId, {
      active: false
    });
    updateStripePriceId(product.id, price.id);
    updateUpdatedOn(product.id, false);
    console.log(`---Book ${book.title} updated in Stripe API ---`);
  } else {
    console.log('Error occur while updating book in Stripe API');
  }
}

async function deleteProduct(id) {
  try {
    const products = await listProducts();
    const product = products.data.find(p => p.id === id);
    if (product) {
      await stripe.products.update(product.id, {
        active: false
      });
      return
    }
  } catch (error) {
    console.error('Error deleting product in Stripe:', error);
    throw new Error('Could not delete product in Stripe');
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
