import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_CART || 'http://localhost:8080/api/cart';

export const getCart = async () => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};

export const addToCart = async (cartItem) => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.post(`${API_URL}/add`, cartItem, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return null;
  }
};

export const updateCartItem = async (itemId, quantity) => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.put(`${API_URL}/update/${itemId}`, { quantity }, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return null;
  }
};

export const removeFromCart = async (itemId) => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.delete(`${API_URL}/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` },
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return false;
  }
};

export const clearCart = async () => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.delete(`${API_URL}/clear`, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` },
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
