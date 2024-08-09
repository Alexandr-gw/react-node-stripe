const bookService = require('../services/bookService');
const { addProduct, updateProduct, deleteProduct } = require('../services/stripeService');
const { listProducts } = require('../utils/stripeUtils');

exports.getBooks = (req, res) => {
  res.json(bookService.getBooks());
  listProducts()
};

exports.addBook = (req, res) => {
  const book = req.body;
  const newBook = bookService.addBook(book)
  addProduct(newBook).then(res => {
    console.log('res=>>>', res)
    updateStripePriceId(res.id, res.default_price);
    res.status(201).json(res);
  })
};

exports.updateBook = (req, res) => {
  const updatedBook = req.body;
  const { id } = req.params;
  const book = bookService.updateBook(id, updatedBook);
  updateProduct(book);
  bookService.updateUpdatedOn(id, true);
  res.json(book);
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;
  bookService.deleteBook(id);
  deleteProduct(book)
  res.status(204).end();
};