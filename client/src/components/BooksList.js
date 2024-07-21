// src/components/App.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook, deleteBook, setBooks } from '../store/actions/actions';
import { initializeSessionStorage, getBooksFromSessionStorage, setBooksInSessionStorage } from '../store/services/sessionStorageService';

const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    initializeSessionStorage();
    dispatch(setBooks(getBooksFromSessionStorage()));
  }, [dispatch]);

  useEffect(() => {
    setBooksInSessionStorage(books);
  }, [books]);

  const handleAddBook = () => {
    const newBook = { title: 'New Book', author: 'New Author', read: 'No', price: 14.99 };
    dispatch(addBook(newBook));
  };

  const handleUpdateBook = (index, updatedBook) => {
    dispatch(updateBook(index, updatedBook));
  };

  const handleDeleteBook = (index) => {
    dispatch(deleteBook(index));
  };
  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Read: {book.read}</p>
            <p>Price: ${book.price}</p>
            <button onClick={() => handleUpdateBook(index, { ...book, read: book.read === 'Yes' ? 'No' : 'Yes' })}>
              Toggle Read Status
            </button>
            <button onClick={() => handleDeleteBook(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default BooksList;
