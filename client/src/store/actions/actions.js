import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK, SET_BOOKS } from "./actionTypes";
export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: book,
});

export const updateBook = (updatedBook) => ({
  type: UPDATE_BOOK,
  payload: { updatedBook },
});

export const deleteBook = (index) => ({
  type: DELETE_BOOK,
  payload: index,
});

export const setBooks = (books) => ({
  type: SET_BOOKS,
  payload: books,
});
