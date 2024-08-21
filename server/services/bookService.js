const Book = require('../models/book');

async function getBooks() {  
  const data = await Book.findAll({ raw: true });  
  return data;
}

async function addBook(newBook, priceId) {
  newBook.stripePriceId = priceId.default_price;
  return await Book.create(newBook);
}

async function updateBook(id, updatedBook) {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.update(updatedBook);
  return book;
}

async function updateStripePriceId(id, priceId) {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.update({ stripePriceId: priceId });
  return book;
}

async function updateUpdatedOn(id, updatedOn) {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.update({ updatedOn: updatedOn ? new Date() : null });
  return book;
}

async function deleteBook(id) {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.destroy();
  return book;
}

module.exports = { getBooks, addBook, updateBook, updateStripePriceId, updateUpdatedOn, deleteBook };
