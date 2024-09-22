import {
    GET_USERS,
    EDIT_USER,
    DELETE_USER,
    USER_ERROR,
  } from '../actions/actionTypes';
  
  const initialState = {
    users: [],
    loading: true,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      case EDIT_USER:
        return {
          ...state,
          users: state.users.map(user =>
            user.id === action.payload.id ? action.payload : user
          ),
          loading: false,
        };
      case DELETE_USER:
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.payload),
          loading: false,
        };
      case USER_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  