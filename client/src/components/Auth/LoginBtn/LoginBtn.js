import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction, tokenVerified } from "../../../store/actions/actionsAuth";
import authService from "../../../store/services/authService";
import { jwtDecode } from "jwt-decode";
const LoginBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const tokenCookie = Cookies.get('token');
        if (tokenCookie) {
            authService.verifyToken(tokenCookie).then((newToken) => {
                setIsAuthenticated(true);
                dispatch(tokenVerified(newToken));
            }).catch(() => {
                handleLogout();
            });
            setUserRole(jwtDecode(tokenCookie).role);
        }
    }, [token, dispatch]);
    const handleLogin = () => {
        navigate('/Login');
    };

    const handleLogout = () => {
        dispatch(logoutAction());
        Cookies.remove('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <span>{userRole}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button onClick={handleLogin} >Login/Register</button>
                </>
            )}
        </div>
    );
};

export default LoginBtn;
