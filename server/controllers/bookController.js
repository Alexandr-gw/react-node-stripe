const bookService = require('../services/bookService');
const { StatusCodes } = require('http-status-codes');
const { addProduct, updateProduct, deleteProduct } = require('../services/stripeService');

async function getBooks(req, res) {
  try {
    const books = await bookService.getBooks();

    const booksWithImageUrls = books.map(book => ({
      ...book,
      imageUrl: book.imageUrl ? `${req.protocol}://${req.get('host')}/uploads/${book.imageUrl}` : null,
    }));

    res.status(StatusCodes.OK).json(booksWithImageUrls);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not fetch books' });
  }
}

async function addBook(req, res) {
  const book = req.body;
  try {
    let imageUrl;

    if (req.file) {
      if (process.env.NODE_ENV === 'development') {
        book.imageUrl = req.file.filename;
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      } else {
        const { upload } = require('@vercel/blob');
        
        const result = await upload(req.file.buffer, {
          contentType: req.file.mimetype,
          originalName: req.file.originalname,
        });
        imageUrl = result.url;
        book.imageUrl = result.url; 
      }
    }

    const product = await addProduct(book);
    const savedBook = await bookService.addBook(book, product);

    const savedBookWithImageUrl = {
      ...savedBook.toJSON(),
      imageUrl: imageUrl || null, // Set the final URL or null if no image
    };

    res.status(StatusCodes.CREATED).json(savedBookWithImageUrl);
  } catch (error) {
    console.error('Error adding book:->', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not add book', message: error.message });
  }
}

async function updateBook(req, res) {
  const updatedBook = req.body;
  const { id } = req.params;
  try {
    if (req.file) {
      updatedBook.imageUrl = req.file.path;
    }
    await updateProduct(id, updatedBook);
    const book = await bookService.updateBook(id, updatedBook);
    bookService.updateUpdatedOn(id, true);
    
    const bookWithImageUrl = {
      ...book.toJSON(),
      imageUrl: book.imageUrl ? `${req.protocol}://${req.get('host')}/uploads/${book.imageUrl}` : null,
    };
    res.status(StatusCodes.OK).json(bookWithImageUrl);
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

async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(id);
    const bookWithImageUrl = {
      ...book.toJSON(),
      imageUrl: book.imageUrl ? `${req.protocol}://${req.get('host')}/uploads/${book.imageUrl}` : null,
    };
    res.status(StatusCodes.OK).json(bookWithImageUrl);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Could not fetch book' });
  }
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById
};
