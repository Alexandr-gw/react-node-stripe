import { useState, useEffect } from "react";
import { validateBook } from "../validator/bookValidator";

export const useBookForm = (onSubmit, book, onClose) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    read: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      handleReset();
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBook(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      handleReset();
      onClose(); 
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      price: "",
      read: false,
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
