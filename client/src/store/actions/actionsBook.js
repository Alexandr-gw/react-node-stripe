import {
  GET_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  BOOK_ERROR,
} from './actionTypes';
import bookService from '../services/bookService';

export const getBooks = () => async dispatch => {
  try {
    const data = await bookService.getBooks();
    dispatch({
      type: GET_BOOKS,
      payload: data || {},
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: err.response.data,
    });
  }
};

export const addBook = (book) => async dispatch => {
  try {
    const data = await bookService.addBook(book);
    dispatch({
      type: ADD_BOOK,
      payload: data || {},
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: err.response.data,
    });
  }
};

export const updateBook = (id, book) => async dispatch => {
  try {
    const data = await bookService.updateBook(id, book);
    dispatch({
      type: UPDATE_BOOK,
      payload: data || {},
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: err.response.data,
    });
  }
};

export const deleteBook = (id) => async dispatch => {
  try {
    await bookService.deleteBook(id);
    dispatch({
      type: DELETE_BOOK,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: err.response.data,
    });
  }
};
