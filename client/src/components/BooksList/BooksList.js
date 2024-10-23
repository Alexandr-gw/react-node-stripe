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
        <div className="flex justify-between items-center mb-6">
          {role === 'admin' && (
            <button
              onClick={handleAddClick}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Add Book
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition relative group"
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h5 className="text-lg font-semibold">{book.title}</h5>
                <h6 className="text-md text-gray-600">{book.author}</h6>
                <p className="text-lg font-bold">${book.price}</p>
              </div>
              <AddToCart product={book} />
              {role === 'admin' && (
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
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
