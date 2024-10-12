import {
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CART_ERROR
} from '../actions/actionTypes';

const initialState = {
  cart: { items: [], totalPrice: 0 },
  error: null,
  loading: true,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        error: null,
        loading: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, action.payload],
          loading: false,
        },
      }
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.productId === action.payload.productId ? action.payload : item
          ),
          loading: false,
        },
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter((item) => item.productId !== action.payload),
        },
        loading: false,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: { items: [], totalPrice: 0 },
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
