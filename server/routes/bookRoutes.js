const express = require('express');
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const router = express.Router();
const validate = require('../middleware/validationMiddleware');
const bookSchema= require('../validator/bookValidator');

router.get('/', getBooks);
router.post('/', validate(bookSchema), addBook);
router.put('/:id', validate(bookSchema), updateBook);
router.delete('/:id', deleteBook);

module.exports = router;