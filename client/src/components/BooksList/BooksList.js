import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, addBook, updateBook, deleteBook } from "../../store/actions/actionsBook";
import BookModal from "../BookModal/BookModal";
import CheckoutButton from '../CheckoutBtn/CheckoutBtn';
import LoadingPage from "../LoadingPage/LoadingPage";
import useRole from "../../hooks/useRole";

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

  const handleNewBook = (newBook) => {
    dispatch(addBook(newBook));
  };
  const handleUpdateBook = (id, updatedBook) => {
    dispatch(updateBook(id, updatedBook));
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
      handleUpdateBook(currentBook.id, book);
    } else {
      handleNewBook(book);
    }
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  if (loading) {
    return (<LoadingPage />)
  } else {
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
                <CheckoutButton book={book} />
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
