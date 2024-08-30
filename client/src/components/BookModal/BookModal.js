import React from "react";
import Modal from "react-modal";
import { useBookForm } from "../../hooks/useBookForm";
import "./BookModal.css";

Modal.setAppElement("#root");

const BookModal = ({ isOpen, onClose, onSubmit, book }) => {
  const { formData, errors, handleChange, handleSubmit, handleReset } = useBookForm(onSubmit, book, onClose);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Book Modal"
      className={"wrapper"}
    >
      <button onClick={onClose} className="close-btn">
        X
      </button>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-line">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="form-line">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && <div className="error">{errors.author}</div>}
        </div>
        <div className="form-line">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>
        <div className="form-line">
          <label>
            Read:
            <input
              type="checkbox"
              name="read"
              checked={formData.read}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-btns">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookModal;
