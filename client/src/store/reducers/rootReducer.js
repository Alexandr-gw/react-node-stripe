import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import stripeReducer from './stripeReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  stripe: stripeReducer,
  auth: authReducer,
  users: userReducer,
  cart: cartReducer
});

export default rootReducer;
