const { createCheckoutSession, findOrCreateProduct } = require('../services/stripeService');
const { getBooks } = require('../services/bookService');

const handleCreateCheckoutSession = async (req, res) => {
  const { quantity, id } = req.body;

  try {
    const books = getBooks();
    const book = books.find(book => book.id === id);

    if (!book) {
      throw new Error('Product not found in mock data');
    }
console.log('book--->', book);
    newBook = await findOrCreateProduct(book)
    console.log('newBook--->', newBook);

    const session = await createCheckoutSession(newBook.default_price);
    
    res.json(session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleCreateCheckoutSession,
};
