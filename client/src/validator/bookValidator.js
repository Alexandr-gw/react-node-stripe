export const validateBook = (data) => {
  const errors = {};

  if (!data.title) {
    errors.title = "Title is required";
  }

  if (!data.author) {
    errors.author = "Author is required";
  }

  if (!data.price) {
    errors.price = "Price is required";
  } else if (isNaN(data.price) || data.price <= 0) {
    errors.price = "Price must be a positive number";
  }

  return errors;
};