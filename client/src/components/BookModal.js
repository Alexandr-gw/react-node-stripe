import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../assets/css/BookModal.css";

Modal.setAppElement("#root");
const BookModal = ({ isOpen, onClose, onSubmit, book }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    read: true,
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: "",
        author: "",
        price: "",
        read: false,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    console.log(e)
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      price: "",
      read: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleReset();
    onClose();
  };

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
        </div>
        <div className="form-line">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-line">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
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
