const books = require('../mockdata/mockData');

exports.getBooks = (req, res) => {
  res.json(books);
};