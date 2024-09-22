const { getBooks, addBook, updateBook, updateStripePriceId, updateUpdatedOn, deleteBook } = require('../services/bookService');
const Book = require('../models/book');

jest.mock('../models/book');

describe('bookService Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBooks', () => {
    it('should return books when they exist', async () => {
      const mockBooks = [{ id: 1, title: 'Existing Book', author: 'Author', read: true, stripePriceId: 'price_123' }];
      Book.findAll.mockResolvedValue(mockBooks);

      const books = await getBooks();
      expect(Book.findAll).toHaveBeenCalledTimes(1);
      expect(books).toEqual(mockBooks);
    });

    it('should create a default book if no books exist', async () => {
      Book.findAll.mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: 1, title: 'Default Book', author: 'Default Author', read: false, stripePriceId: 'default_price_id' }]);
      Book.create.mockResolvedValue({ id: 1, title: 'Default Book', author: 'Default Author', read: false, stripePriceId: 'default_price_id' });

      const books = await getBooks();
      expect(Book.findAll).toHaveBeenCalledTimes(2);
      expect(Book.create).toHaveBeenCalledWith({
        title: 'Default Book',
        author: 'Default Author',
        read: false,
        stripePriceId: 'default_price_id',
      });
      expect(books).toEqual([{ id: 1, title: 'Default Book', author: 'Default Author', read: false, stripePriceId: 'default_price_id' }]);
    });
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const newBook = { title: 'New Book', author: 'New Author', read: false };
      const priceId = { default_price: 'price_456' };
      Book.create.mockResolvedValue({ id: 1, ...newBook, stripePriceId: 'price_456' });

      const book = await addBook(newBook, priceId);
      expect(Book.create).toHaveBeenCalledWith({ ...newBook, stripePriceId: 'price_456' });
      expect(book).toEqual({ id: 1, ...newBook, stripePriceId: 'price_456' });
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const updatedBook = { title: 'Updated Book' };
      const mockBook = { id: 1, update: jest.fn().mockResolvedValue(null) };
      Book.findByPk.mockResolvedValue(mockBook);

      const book = await updateBook(1, updatedBook);
      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(mockBook.update).toHaveBeenCalledWith(updatedBook);
      expect(book).toEqual(mockBook);
    });

    it('should throw an error if the book is not found', async () => {
      Book.findByPk.mockResolvedValue(null);

      await expect(updateBook(1, { title: 'Non-existent Book' })).rejects.toThrow('Book not found');
    });
  });

  describe('updateStripePriceId', () => {
    it('should update the stripePriceId of an existing book', async () => {
      const mockBook = { id: 1, update: jest.fn().mockResolvedValue(null) };
      Book.findByPk.mockResolvedValue(mockBook);

      const book = await updateStripePriceId(1, 'new_price_id');
      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(mockBook.update).toHaveBeenCalledWith({ stripePriceId: 'new_price_id' });
      expect(book).toEqual(mockBook);
    });
  });

  describe('updateUpdatedOn', () => {
    it('should update the updatedOn field of an existing book', async () => {
      const mockBook = { id: 1, update: jest.fn().mockResolvedValue(null) };
      Book.findByPk.mockResolvedValue(mockBook);

      const book = await updateUpdatedOn(1, true);
      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(mockBook.update).toHaveBeenCalledWith({ updatedOn: expect.any(Date) });
      expect(book).toEqual(mockBook);
    });

    it('should set updatedOn to null if updatedOn is false', async () => {
      const mockBook = { id: 1, update: jest.fn().mockResolvedValue(null) };
      Book.findByPk.mockResolvedValue(mockBook);

      const book = await updateUpdatedOn(1, false);
      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(mockBook.update).toHaveBeenCalledWith({ updatedOn: null });
      expect(book).toEqual(mockBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      const mockBook = { id: 1, destroy: jest.fn().mockResolvedValue(null) };
      Book.findByPk.mockResolvedValue(mockBook);

      const book = await deleteBook(1);
      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(mockBook.destroy).toHaveBeenCalledTimes(1);
      expect(book).toEqual(mockBook);
    });

    it('should throw an error if the book is not found', async () => {
      Book.findByPk.mockResolvedValue(null);

      await expect(deleteBook(1)).rejects.toThrow('Book not found');
    });
  });
});
