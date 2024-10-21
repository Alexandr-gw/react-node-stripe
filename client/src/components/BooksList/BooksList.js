import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, addBook, updateBook, deleteBook } from "../../store/actions/actionsBook";
import BookModal from "../BookModal/BookModal";
import LoadingPage from "../LoadingPage/LoadingPage";
import useRole from "../../hooks/useRole";
import AddToCart from "../Cart/AddToCart";

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
    return <LoadingPage />;
  } else {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h3 className="text-3xl font-semibold mb-6">Books</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="grid grid-cols-5 gap-4 text-xl font-medium">
            <h4>Title</h4>
            <h4>Author</h4>
            <h4>Read</h4>
            <h4>Price</h4>
            <h4>Image</h4>
          </div>
          {role === 'admin' && (
            <button 
              onClick={handleAddClick} 
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Add Book
            </button>
          )}
        </div>
        <ul className="space-y-4">
          {books.map((book, index) => (
            <li 
              className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center" 
              key={index}
            >
              <div className="grid grid-cols-5 gap-4">
                <h5 className="text-lg font-medium">{book.title}</h5>
                <h5 className="text-lg">{book.author}</h5>
                <h5 className="text-lg">{book.read ? "Yes" : "No"}</h5>
                <h5 className="text-lg">${book.price}</h5>
                {book.imageUrl && (
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex space-x-4">
                {role === 'admin' && (
                  <button 
                    onClick={() => handleEditClick(book)} 
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                )}
                {role === 'admin' && (
                  <button 
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                )}
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
