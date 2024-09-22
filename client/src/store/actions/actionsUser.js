import {
    GET_USERS,
    EDIT_USER,
    DELETE_USER,
    USER_ERROR,
  } from './actionTypes';
  import userService from '../services/userService';
  
  export const getUsers = () => async dispatch => {
    try {
      const data = await userService.getUser();
      dispatch({
        type: GET_USERS,
        payload: data || {},
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response?.data,
      });
    }
  };
  
  export const editUser = (id, user) => async dispatch => {
    try {
      const data = await userService.updateUser(id, user);
      dispatch({
        type: EDIT_USER,
        payload: data || {},
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response?.data,
      });
    }
  };
  
  export const deleteUser = (id) => async dispatch => {
    try {
      await userService.deleteUser(id);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response?.data,
      });
    }
  };
  