const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

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
        unit_amount: book.price*100,
      }
     });
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
