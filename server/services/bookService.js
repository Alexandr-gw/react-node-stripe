const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../mockdata/mockData.json');
const readBooksFromFile = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeBooksToFile = (books) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(books, null, 2), 'utf-8');
};

exports.getBooks = () => {
  return readBooksFromFile();
};

exports.addBook = (newBook) => {
  const books = readBooksFromFile();
  newBook.id = (books.length + 1).toString();
  books.push(newBook);
  writeBooksToFile(books);
  return newBook;
};

exports.updateBook = (id, updatedBook) => {
  const books = readBooksFromFile();
  const index = books.findIndex(book => book.id.toString() === id.toString());
  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook, id: books[index].id };
    writeBooksToFile(books);
    return books[index];
  }
  throw new Error('Book not found');
};

exports.deleteBook = (id) => {
  const books = readBooksFromFile();
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    writeBooksToFile(books);
  } else {
    throw new Error('Book not found');
  }
};
