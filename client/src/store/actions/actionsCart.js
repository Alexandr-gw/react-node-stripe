import {
    GET_CART,
    ADD_TO_CART,
    UPDATE_CART_ITEM,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CART_ERROR
  } from './actionTypes';
  import cartService from '../../store/services/cartServices';
  
  export const getCart = () => async dispatch => {
    try {
      const data = await cartService.getCart();
      dispatch({
        type: GET_CART,
        payload: data || {},
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response ? err.response.data : 'Error fetching cart',
      });
    }
  };
  
  export const addToCart = (cartItem) => async dispatch => {
    try {
      const data = await cartService.addToCart(cartItem);
      dispatch({
        type: ADD_TO_CART,
        payload: data || {},
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response ? err.response.data : 'Error adding item to cart',
      });
    }
  };
  
  export const updateCartItem = (itemId, quantity) => async dispatch => {
    try {
      const data = await cartService.updateCartItem(itemId, quantity);
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: data || {},
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response ? err.response.data : 'Error updating cart item',
      });
    }
  };
  
  export const removeFromCart = (itemId) => async dispatch => {
    try {
      await cartService.removeFromCart(itemId);
      dispatch({
        type: REMOVE_FROM_CART,
        payload: itemId,
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response ? err.response.data : 'Error removing item from cart',
      });
    }
  };
  
  export const clearCart = () => async dispatch => {
    try {
      await cartService.clearCart();
      dispatch({
        type: CLEAR_CART,
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response ? err.response.data : 'Error clearing cart',
      });
    }
  };  