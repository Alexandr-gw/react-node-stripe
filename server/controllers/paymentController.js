const { createCheckoutSession, findProduct } = require('../services/stripeService');
const { getBooks } = require('../services/bookService');

const handleCreateCheckoutSession = async (req, res) => {
  const { quantity, id } = req.body;

  try {
    const books = getBooks();
    const book = books.find(book => book.id === id);

    if (!book) {
      return res.status(404).json({ error: 'Product not found in mock data' });
    }

    let newBook;
    try {
      newBook = await findProduct(book);
    } catch (error) {
      console.error('Error finding product in Stripe:', error);
      return res.status(500).json({ error: 'Error finding product in Stripe' });
    }

    if (!newBook) {
      return res.status(404).json({ error: 'Product not found in Stripe' });
    }

    let session;
    try {
      session = await createCheckoutSession(newBook.default_price, quantity);
    } catch (error) {
      console.error('Error creating checkout session in Stripe:', error);
      return res.status(500).json({ error: 'Error creating checkout session in Stripe' });
    }
    res.json(session.url);
  } catch (error) {
    console.error('Error handling create checkout session:', error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session' });
  }
};


module.exports = {
  handleCreateCheckoutSession,
};
