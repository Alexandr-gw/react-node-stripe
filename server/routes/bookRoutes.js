const express = require('express');
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const router = express.Router();
const validate = require('../middleware/validationMiddleware');
const bookSchema = require('../validator/bookValidator');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.get('/', getBooks);
router.post('/', authenticateToken, authorizeRole(['admin']), validate(bookSchema), addBook);
router.put('/:id', authenticateToken, authorizeRole(['admin']), validate(bookSchema), updateBook);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), validate(bookSchema), deleteBook);

module.exports = router;