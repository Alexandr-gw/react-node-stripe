// src/components/App.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  updateBook,
  deleteBook,
  setBooks,
} from "../store/actions/actions";
import {
  initializeSessionStorage,
  getBooksFromSessionStorage,
  setBooksInSessionStorage,
} from "../store/services/sessionStorageService";

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
    const newBook = {
      title: "New Book",
      author: "New Author",
      read: "No",
      price: 14.99,
    };
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
      <h3>Books</h3>
      <div className="book-header-wrapper">
        <div className="book-header">
          <h4>Title</h4>
          <h4>Author</h4>
          <h4>Read</h4>
          <h4>Price</h4>
        </div>
        <button className="add-book-btn" onClick={handleAddBook}>Add Book</button>
      </div>
      <ul className="book-list">
        {books.map((book, index) => (
          <li className="book-item" key={index}>
            <div className="book-description">
              <h5>{book.title}</h5>
              <h5>{book.author}</h5>
              <h5>{book.read}</h5>
              <h5>${book.price}</h5>
            </div>
            <div className="book-btns">
              <button
                className="toggle-read-btn"
                onClick={() =>
                  handleUpdateBook(index, {
                    ...book,
                    read: book.read === "Yes" ? "No" : "Yes",
                  })
                }
              >
                Toggle Read Status
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteBook(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
