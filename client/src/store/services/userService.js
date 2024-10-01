import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_USER || 'http://localhost:8080/api/user';

export const getUser = async () => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const updateUser = async (id, updatedUserInfo) => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUserInfo, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export const deleteUser = async (id) => {
  const authInterceptorToken = Cookies.get('token');
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${authInterceptorToken}` }
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
};

export default {
  getUser,
  updateUser,
  deleteUser
};
