import {
  GET_BOOKS,
  GET_BOOKS_BY_ID,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  BOOK_ERROR,
} from '../actions/actionTypes';

const initialState = {
  books: [],
  loading: true,
  error: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case GET_BOOKS_BY_ID:
      return {
        ...state,
        books: action.payload,
        loading: false,
      }
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
        loading: false,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
        loading: false,
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
        loading: false,
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bookReducer;
