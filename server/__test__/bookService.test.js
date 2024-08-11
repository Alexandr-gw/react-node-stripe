const fs = require('fs');
const path = require('path');
const {
  getBooks,
  addBook,
  updateBook,
  updateStripePriceId,
  updateUpdatedOn,
  deleteBook
} = require('../services/bookService');

jest.mock('fs');

describe('bookService', () => {
  const dataFilePath = path.join(__dirname, '../mockdata/mockData.json');
  const mockBooks = [
    { id: '1', title: 'Book One', stripePriceId: 'price_123', updatedOn: '2023-08-01T00:00:00.000Z' },
    { id: '2', title: 'Book Two', stripePriceId: 'price_456' }
  ];

  beforeEach(() => {
    fs.readFileSync.mockReturnValue(JSON.stringify(mockBooks));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all books', () => {
    const books = getBooks();
    expect(fs.readFileSync).toHaveBeenCalledWith(dataFilePath, 'utf-8');
    expect(books).toEqual(mockBooks);
  });

  it('should add a new book', () => {
    const newBook = { id: '3', title: 'Book Three' };
    const priceId = { default_price: 'price_789' };
    const expectedBooks = [...mockBooks, { ...newBook, stripePriceId: priceId.default_price }];

    addBook(newBook, priceId);

    expect(fs.writeFileSync).toHaveBeenCalledWith(dataFilePath, JSON.stringify(expectedBooks, null, 2), 'utf-8');
  });

  it('should update an existing book', () => {
    const updatedBook = { title: 'Updated Book One' };
    const expectedBooks = [
      { ...mockBooks[0], ...updatedBook, id: '1' },
      mockBooks[1]
    ];

    const book = updateBook('1', updatedBook);

    expect(fs.writeFileSync).toHaveBeenCalledWith(dataFilePath, JSON.stringify(expectedBooks, null, 2), 'utf-8');
    expect(book).toEqual(expectedBooks[0]);
  });

  it('should throw an error if trying to update a non-existent book', () => {
    expect(() => updateBook('3', { title: 'Non-existent Book' })).toThrow('Book not found');
  });

  it('should update the stripe price ID for a book', () => {
    const newPriceId = 'price_789';
    const expectedBooks = [
      { ...mockBooks[0], stripePriceId: newPriceId },
      mockBooks[1]
    ];

    const book = updateStripePriceId('1', newPriceId);

    expect(fs.writeFileSync).toHaveBeenCalledWith(dataFilePath, JSON.stringify(expectedBooks, null, 2), 'utf-8');
    expect(book).toEqual(expectedBooks[0]);
  });

  it('should update the updatedOn field for a book', () => {
    const timestamp = new Date().toISOString();
    const expectedBooks = [
      { ...mockBooks[0], updatedOn: timestamp },
      mockBooks[1]
    ];

    const book = updateUpdatedOn('1', true);

    expect(fs.writeFileSync).toHaveBeenCalledWith(dataFilePath, JSON.stringify(expectedBooks, null, 2), 'utf-8');
    expect(book.updatedOn).toEqual(timestamp);
  });

  it('should remove the updatedOn field if updatedOn is set to false', () => {
    const expectedBooks = [
      { ...mockBooks[0], updatedOn: false },
      mockBooks[1]
    ];

    const book = updateUpdatedOn('1', false);

    expect(fs.writeFileSync).toHaveBeenCalledWith(dataFilePath, JSON.stringify(expectedBooks, null, 2), 'utf-8');
    expect(book.updatedOn).toBe(false);
  });

  it('should delete a book by ID', () => {
    const expectedBooks = [mockBooks[1]];

    deleteBook('1');

    expect(fs.writeFileSync).toHaveBeenCalledWith(dataFilePath, JSON.stringify(expectedBooks, null, 2), 'utf-8');
  });

  it('should throw an error if trying to delete a non-existent book', () => {
    expect(() => deleteBook('3')).toThrow('Book not found');
  });
});
