const express = require('express');
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById
} = require('../controllers/bookController');
const router = express.Router();
const validate = require('../middleware/validationMiddleware');
const bookSchema = require('../validator/bookValidator');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const {upload, handleFileUpload} = require('../middleware/uploadMiddleware');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', authenticateToken, authorizeRole(['admin']), upload.single('image'), handleFileUpload ,validate(bookSchema), addBook);
router.put('/:id', authenticateToken, authorizeRole(['admin']), upload.single('image'), validate(bookSchema), updateBook);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteBook);

module.exports = router;