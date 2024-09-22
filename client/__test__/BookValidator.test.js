const { validateBook } = require("../src/validator/bookValidator");

describe("validateBook|Modal fields validation", () => {
  test("should return no errors for valid data", () => {
    const validData = {
      title: "A Great Book",
      author: "Jane Doe",
      price: 19.99,
      read: true,
    };

    const errors = validateBook(validData);

    expect(errors).toEqual({});
  });

  test("should return an error if title is missing", () => {
    const invalidData = {
      title: "",
      author: "Jane Doe",
      price: 19.99,
      read: true,
    };

    const errors = validateBook(invalidData);

    expect(errors).toHaveProperty("title");
    expect(errors.title).toBe("Title is required");
  });

  test("should return an error if author is missing", () => {
    const invalidData = {
      title: "A Great Book",
      author: "",
      price: 19.99,
      read: true,
    };

    const errors = validateBook(invalidData);

    expect(errors).toHaveProperty("author");
    expect(errors.author).toBe("Author is required");
  });

  test("should return an error if price is missing", () => {
    const invalidData = {
      title: "A Great Book",
      author: "Jane Doe",
      price: "",
      read: true,
    };

    const errors = validateBook(invalidData);

    expect(errors).toHaveProperty("price");
    expect(errors.price).toBe("Price is required");
  });

  test("should return an error if price is not a positive number", () => {
    const invalidData = {
      title: "A Great Book",
      author: "Jane Doe",
      price: -10,
      read: true,
    };

    const errors = validateBook(invalidData);

    expect(errors).toHaveProperty("price");
    expect(errors.price).toBe("Price must be a positive number");
  });

  test("should return multiple errors for multiple invalid fields", () => {
    const invalidData = {
      title: "",
      author: "",
      price: -10,
      read: true,
    };

    const errors = validateBook(invalidData);

    expect(errors).toHaveProperty("title");
    expect(errors).toHaveProperty("author");
    expect(errors).toHaveProperty("price");
    expect(errors.title).toBe("Title is required");
    expect(errors.author).toBe("Author is required");
    expect(errors.price).toBe("Price must be a positive number");
  });
});
