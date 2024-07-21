import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK, SET_BOOKS } from '../actions/actionTypes';

const initialState = [];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return action.payload;
    case ADD_BOOK:
      return [...state, action.payload];
    case UPDATE_BOOK:
      return state.map((book, index) =>
        index === action.payload.index ? action.payload.updatedBook : book
      );
    case DELETE_BOOK:
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

export default booksReducer;