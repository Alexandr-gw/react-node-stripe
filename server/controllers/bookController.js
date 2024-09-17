const bookService = require('../services/bookService');
const { StatusCodes } = require('http-status-codes');
const { addProduct, updateProduct, deleteProduct } = require('../services/stripeService');

async function getBooks(req, res) {
  try {
    const books = await bookService.getBooks();
    res.status(StatusCodes.OK).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not fetch books' });
  }
}

async function addBook(req, res) {
  const book = req.body;
  try {
    const product = await addProduct(book);
    const savedBook = await bookService.addBook(book, product);
    res.status(StatusCodes.CREATED).json(savedBook);
  } catch (error) {
    console.error('Error adding book:->', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not add book', message: error.message });
  }
}

async function updateBook(req, res) {
  const updatedBook = req.body;
  const { id } = req.params;
  try {
    await updateProduct(id, updatedBook);
    const book =  await bookService.updateBook(id, updatedBook);
    bookService.updateUpdatedOn(id, true);
    res.status(StatusCodes.OK).json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not update book' });
  }
}

async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    bookService.deleteBook(id);
    console.log(`Book ${id} deleted from Stripe API`);
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not delete book' });
  }
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
