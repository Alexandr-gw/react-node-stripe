import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import stripeReducer from './stripeReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  stripe: stripeReducer,
  auth: authReducer
});

export default rootReducer;
