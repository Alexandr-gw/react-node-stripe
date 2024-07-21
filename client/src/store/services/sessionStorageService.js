import books from '../mockData/mockData';

export const initializeSessionStorage = () => {
  if (!sessionStorage.getItem('books')|| sessionStorage.getItem('books') === '[]') {
    sessionStorage.setItem('books', JSON.stringify(books));
  }
};

export const getBooksFromSessionStorage = () => {
  const booksData = sessionStorage.getItem('books');
  return booksData ? JSON.parse(booksData) : [];
};

export const setBooksInSessionStorage = (books) => {
  sessionStorage.setItem('books', JSON.stringify(books));
};
