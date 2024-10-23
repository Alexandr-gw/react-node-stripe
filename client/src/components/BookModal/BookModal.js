import React from "react";
import Modal from "react-modal";
import { useBookForm } from "../../hooks/useBookForm";

Modal.setAppElement("#root");

const BookModal = ({ isOpen, onClose, onSubmit, book }) => {
  const { formData, errors, handleChange, handleImageChange, handleSubmit, handleReset } = useBookForm(onSubmit, book, onClose);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Book Modal"
      className={"wrapper"}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">
          {book ? "Edit Book" : "Add a New Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="read"
                checked={formData.read}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Read</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
            />
            {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>

  );
};

export default BookModal;
