const bookService = require('../services/bookService');

exports.getBooks = (req, res) => {
  res.json(bookService.getBooks());
};

exports.addBook = (req, res) => {
  const newBook = req.body;
  const addedBook = bookService.addBook(newBook);
  res.status(201).json(addedBook);
};

exports.updateBook = (req, res) => {
  const updatedBook = req.body;
  const { id } = req.params;
  const book = bookService.updateBook(id, updatedBook);
  bookService.updateIfEdited(id, true);
  res.json(book);
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;
  bookService.deleteBook(id);
  res.status(204).end();
};
