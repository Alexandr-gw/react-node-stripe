// src/components/App.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook, deleteBook, setBooks, } from "../store/actions/actions";
import { initializeSessionStorage, getBooksFromSessionStorage, setBooksInSessionStorage, } from "../store/services/sessionStorageService";
import BookModal from "./BookModal";
import CheckoutButton from './CheckoutBtn';

const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const handleNewBook = (newBook) => {
    dispatch(addBook(newBook));
  };

  useEffect(() => {
    initializeSessionStorage();
    dispatch(setBooks(getBooksFromSessionStorage()));
  }, [dispatch]);

  useEffect(() => {
    setBooksInSessionStorage(books);
  }, [books]);

  const handleUpdateBook = (updatedBook) => {
    dispatch(updateBook(updatedBook));
    setCurrentBook(null);
  };
  const handleEditClick = (book) => {
    setIsModalOpen(true);
    setCurrentBook(book);
  };

  const handleAddClick = () => {
    setCurrentBook(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (book) => {
    if (currentBook) {
      handleUpdateBook(book);
    } else {
      handleNewBook(book);
    }
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
        <button onClick={() => handleAddClick()} className="add-book-btn">
          Add Book
        </button>
      </div>
      <ul className="book-list">
        {books.map((book, index) => (
          <li className="book-item" key={index}>
            <div className="book-description">
              <h5>{book.title}</h5>
              <h5>{book.author}</h5>
              <h5>{book.read ? "Yes" : "No"}</h5>
              <h5>${book.price}</h5>
            </div>
            <div className="book-btns">
              <button
                onClick={() => handleEditClick(book)}
                className="edit-btn">  Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteBook(index)}
              >
                Delete
              </button>
              <CheckoutButton price={book.price} />
            </div>
          </li>
        ))}
      </ul>
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        book={currentBook}
      />
    </div>
  );
};

export default BooksList;
