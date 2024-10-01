import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction, tokenVerified } from "../../store/actions/actionsAuth";
import authService from "../../store/services/authService";
import { jwtDecode } from "jwt-decode";
import "./NavBar.css";


const NavBar = () => {
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
        } else {
            setUserRole('');
            setIsAuthenticated(false);
        }
    }, [token, dispatch]);

    const handleLogout = () => {
        dispatch(logoutAction());
        setIsAuthenticated(false);
        setUserRole('');
        navigate('/');
    };
    return (
        <div className="header">
            <div>
                <div>Logo</div>
            </div>
            <div className="nav-btns">
                <Link data-testid="HomePage" to="/">Home</Link>
                <Link data-testid="BooksList" to="/BooksList">Books</Link>
                {userRole === 'admin' && (
                    <Link data-testid="AdminPanel" to="/AdminPanel">Admin Panel</Link>
                )}
            </div>
            <div className="cart-login-btns">
                {isAuthenticated ? (
                    <>
                        <span>{userRole}</span>
                        <Link data-testid="Logout" to="/" onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link data-testid="Cart" to="/Cart">Cart</Link>
                        <Link data-testid="Login" to="/Login">Login/Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
