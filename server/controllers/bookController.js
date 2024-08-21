const bookService = require('../services/bookService');
const { addProduct, updateProduct, deleteProduct } = require('../services/stripeService');

async function getBooks(req, res) {
  try {
    const books = await bookService.getBooks();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Could not fetch books' });
  }
}

async function addBook(req, res) {
  const book = req.body;
  try {
    const product = await addProduct(book);
    const savedBook = bookService.addBook(book, product);
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:->', error);
    res.status(500).json({ error: 'Could not add book' });
  }
}

async function updateBook(req, res) {
  const updatedBook = req.body;
  const { id } = req.params;
  try {
    await updateProduct(id, updatedBook);
    const book = bookService.updateBook(id, updatedBook);
    bookService.updateUpdatedOn(id, true);
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Could not update book' });
  }
}

async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    bookService.deleteBook(id);
    console.log(`Book ${id} deleted from Stripe API`);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Could not delete book' });
  }
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
