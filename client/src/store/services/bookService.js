import axios from 'axios';

const API_URL = process.env.NODE_API_URL || 'http://localhost:8080/api/books';

const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; 
  }
};

const addBook = async (book) => {
  try {
    const response = await axios.post(API_URL, book);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    return null; 
  }
};

const updateBook = async (id, book) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, book);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    return null; 
  }
};

const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting book:', error);
  }
};

const bookService = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};

export default bookService;
