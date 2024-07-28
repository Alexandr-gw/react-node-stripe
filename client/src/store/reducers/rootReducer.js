import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import stripeReducer from './stripeReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  stripe: stripeReducer
});

export default rootReducer;
