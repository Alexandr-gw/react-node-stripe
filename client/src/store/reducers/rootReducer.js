import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import stripeReducer from './stripeReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  stripe: stripeReducer,
  auth: authReducer,
  users: userReducer
});

export default rootReducer;
