const testDb = require('../config/db-test.config.js'); // Import the test DB configuration
const Book = require('../models/book');
const { getBooks, addBook, updateBook, updateStripePriceId, updateUpdatedOn, deleteBook } = require('../services/bookService');

describe('bookService Integration Tests', () => {
  beforeAll(async () => {
    await testDb.sync({ force: true });
  });

  afterAll(async () => {
    await testDb.close();
  });

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  it('should return books when they exist', async () => {
    await Book.create({ title: 'Existing Book', author: 'Author', read: true, price: "100", stripePriceId: 'price_123' });

    const books = await getBooks();
    expect(books.length).toBe(1);
    expect(books[0]).toMatchObject({ title: 'Existing Book', author: 'Author', read: true, price: "100.00", stripePriceId: 'price_123' });
  });

  it('should add a new book', async () => {
    const newBook = { title: 'New Book', author: 'New Author', read: false,price:"100" };
    const priceId = { default_price: 'price_456' };

    const book = await addBook(newBook, priceId);
    const books = await Book.findAll({ raw: true });

    expect(books.length).toBe(1);
    expect(books[0]).toMatchObject({ title: 'New Book', author: 'New Author', read: false, stripePriceId: 'price_456' });
  });

  it('should update an existing book', async () => {
    const book = await Book.create({ title: 'Old Book', author: 'Old Author', read: false,price:"100", stripePriceId: 'price_123' });
    const updatedBook = { title: 'Updated Book' };

    const result = await updateBook(book.id, updatedBook);
    expect(result.title).toBe('Updated Book');
    const updated = await Book.findByPk(book.id, { raw: true });
    expect(updated).toMatchObject({ title: 'Updated Book', author: 'Old Author', read: false });
  });

  it('should update the stripePriceId of an existing book', async () => {
    const book = await Book.create({ title: 'Book', author: 'Author', read: false,price:"100", stripePriceId: 'price_123' });
    const result = await updateStripePriceId(book.id, 'price_789');

    expect(result.stripePriceId).toBe('price_789');
    const updated = await Book.findByPk(book.id, { raw: true });
    expect(updated.stripePriceId).toBe('price_789');
  });

  it('should update the updatedOn field of an existing book', async () => {
    const book = await Book.create({ title: 'Book', author: 'Author', read: false,price:"100", stripePriceId: 'price_123' });
    const result = await updateUpdatedOn(book.id, true);

    expect(result.updatedOn).not.toBeNull();
    const updated = await Book.findByPk(book.id, { raw: true });
    expect(new Date(updated.updatedOn)).toBeInstanceOf(Date);
  });

  it('should delete an existing book', async () => {
    const book = await Book.create({ title: 'Book', author: 'Author', read: false,price:"100", stripePriceId: 'price_123' });
    await deleteBook(book.id);

    const books = await Book.findAll();
    expect(books.length).toBe(0);
  });
});