import { useState, useEffect } from "react";
import { validateBook } from "../validator/bookValidator";

export const useBookForm = (onSubmit, book, onClose) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    read: true,
    image: null,
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

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBook(formData);
    if (Object.keys(validationErrors).length === 0) {
      const formToSubmit = new FormData();
      formToSubmit.append("title", formData.title);
      formToSubmit.append("author", formData.author);
      formToSubmit.append("price", formData.price);
      formToSubmit.append("read", formData.read);
      if (formData.image) {
        formToSubmit.append("image", formData.image);
      }

      onSubmit(formToSubmit);
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
      image: null,
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleImageChange,
    handleSubmit,
    handleReset,
  };
};
