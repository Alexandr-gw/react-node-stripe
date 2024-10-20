import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, addBook, updateBook, deleteBook } from "../../store/actions/actionsBook";
import BookModal from "../BookModal/BookModal";
import LoadingPage from "../LoadingPage/LoadingPage";
import useRole from "../../hooks/useRole";
import AddToCart from "../Cart/AddToCart";
import './BooksList.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const role = useRole();
  const books = useSelector((state) => state.books.books);
  const loading = useSelector(state => state.books.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleNewBook = (formData) => {
    dispatch(addBook(formData));
  };
  const handleUpdateBook = (id, formData) => {
    dispatch(updateBook(id, formData));
  };
  const handleEditClick = (book) => {
    setIsModalOpen(true);
    setCurrentBook(book);
  };

  const handleAddClick = () => {
    setCurrentBook(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (currentBook) {
      handleUpdateBook(currentBook.id, formData);
    } else {
      handleNewBook(formData);
    }
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };
  
  if (loading) {
    return (<LoadingPage />)
  } else {
    return (
      <div className="books-list-wrapper">
        <h3>Books</h3>
        <div className="book-header-wrapper">
          <div className="book-header">
            <h4>Title</h4>
            <h4>Author</h4>
            <h4>Read</h4>
            <h4>Price</h4>
            <h4>Image</h4> 
          </div>
          {role === 'admin' && <button onClick={() => handleAddClick()} className="add-book-btn">
            Add Book
          </button>}
        </div>
        <ul className="book-list">
          {books.map((book, index) => (
            <li className="book-item" key={index}>
              <div className="book-description">
                <h5>{book.title}</h5>
                <h5>{book.author}</h5>
                <h5>{book.read ? "Yes" : "No"}</h5>
                <h5>${book.price}</h5>
                {book.imageUrl && (
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="book-image"
                  />
                )}
              </div>
              <div className="book-btns">
                {role === 'admin' && <button
                  onClick={() => handleEditClick(book)}
                  className="edit-btn">  Edit
                </button>}
                {role === 'admin' && <button
                  className="delete-btn"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>}
                <AddToCart product={book} />
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
  }
};

export default BooksList;
