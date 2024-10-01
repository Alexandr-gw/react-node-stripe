import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_BOOK || 'http://localhost:8080/api/books';

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
const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.post(API_URL, book, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    return null;
  }
};

const updateBook = async (id, book) => {
const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.put(`${API_URL}/${id}`, book, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    return null;
  }
};

const deleteBook = async (id) => {
const authInterceptorToken = Cookies.get('token');
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` }
    });
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
