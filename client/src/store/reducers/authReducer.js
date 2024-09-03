import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    TOKEN_VERIFIED
} from '../actions/actionTypes';

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
        
        case LOGIN_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        
        case REGISTER_SUCCESS:
            return { ...state, loading: false };

        case LOGOUT:
            return { ...state, token: null };

        case TOKEN_VERIFIED:
            return { ...state, token: action.payload };

        default:
            return state;
    }
};

export default authReducer;
