const books = require('../mockdata/mockData');

exports.getBooks = () => {
  return books;
};

exports.addBook = (newBook) => {
  newBook.id = (books.length + 1).toString(); // Simple ID generation
  books.push(newBook);
  return newBook;
};

exports.updateBook = (id, updatedBook) => {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    return books[index];
  }
  throw new Error('Book not found');
};

exports.deleteBook = (id) => {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
  } else {
    throw new Error('Book not found');
  }
};
