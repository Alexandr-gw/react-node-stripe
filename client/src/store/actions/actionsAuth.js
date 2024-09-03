import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    TOKEN_VERIFIED,
    LOGOUT
} from './actionTypes';
import authService from '../services/authService';
import Cookies from 'js-cookie';


export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const tokenVerified = (newToken) => ({ type: TOKEN_VERIFIED, payload: newToken });
export const logout = () => ({ type: LOGOUT });

export const login = (email, password) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const token = await authService.login(email, password);
        dispatch(loginSuccess(token));
    } catch (error) {
        dispatch(loginFailure('Invalid credentials'));
    }
};

export const register = (name, email, password) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        await authService.register(name, email, password);
        dispatch(registerSuccess());
    } catch (error) {
        dispatch(registerFailure('Registration failed'));
    }
};

export const verifyToken = () => async (dispatch) => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
        try {
            const newToken = await authService.verifyToken(savedToken);
            dispatch(tokenVerified(newToken));
        } catch (error) {
            dispatch(logout());
        }
    }
};

export const performLogout = () => (dispatch) => {
    authService.logout();
    dispatch(logout());
};
