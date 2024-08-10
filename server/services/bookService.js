const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../mockdata/mockData.json');
const { v4: uuidv4 } = require('uuid');

const readBooksFromFile = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeBooksToFile = (books) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(books, null, 2), 'utf-8');
};

function getBooks() {
  return readBooksFromFile();
};

function addBook(newBook, priceId) {
  const books = readBooksFromFile();
  books.push({ ...newBook, stripePriceId: priceId.default_price });
  writeBooksToFile(books);
  return newBook;
};

function updateBook(id, updatedBook) {
  const books = readBooksFromFile();
  const book = books.find(book => book.id.toString() === id.toString());
  if (book) {
    Object.assign(book, updatedBook, { id: book.id });
    writeBooksToFile(books);
    return book;
  }
  throw new Error('Book not found');
};


function updateStripePriceId(id, priceId) {
  const books = readBooksFromFile();
  const book = books.find(book => book.id.toString() === id.toString());
  if (book) {
    book.stripePriceId = priceId;
    writeBooksToFile(books);
    return book;
  }
  throw new Error('Book not found');
};


function updateUpdatedOn(id, updatedOn) {
  const books = readBooksFromFile();
  const book = books.find(book => book.id.toString() === id.toString());
  if (book) {
    book.updatedOn = updatedOn ? new Date().toISOString() : false;
    writeBooksToFile(books);
    return book;
  }
  throw new Error('Book not found');
};

function deleteBook(id) {
  const books = readBooksFromFile();
  const updatedBooks = books.filter(book => book.id !== id);
  if (books.length !== updatedBooks.length) {
    writeBooksToFile(updatedBooks);
  } else {
    throw new Error('Book not found');
  }
}


module.exports = { getBooks, addBook, updateBook, updateStripePriceId, updateUpdatedOn, deleteBook }