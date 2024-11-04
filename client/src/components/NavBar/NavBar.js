import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction, tokenVerified } from "../../store/actions/actionsAuth";
import authService from "../../store/services/authService";
import { jwtDecode } from "jwt-decode";
import BurgerMenu from "./BurgerMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CartBtn from "../Cart/CartBtn";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const { token } = useSelector((state) => state.auth);
    const [isNavOpen, setIsNavOpen] = useState(false);
    
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

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className="bg-yellow-300 relative p-4 z-50 w-4/5 rounded-full mx-auto left-0 right-0">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="font-bold text-2xl italic text-green-900">
                    <Link to="/">logo</Link>
                </div>

                <div className="block md:hidden">
                    <button onClick={toggleNav} className="text-green-900 focus:outline-none">
                        <FontAwesomeIcon icon={faBars} className="w-7 h-7" />
                    </button>
                </div>

                <nav className="hidden md:flex space-x-8 text-black font-semibold">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/BooksList" className="hover:underline">Shop</Link>
                    {userRole === 'admin' && (
                        <Link data-testid="AdminPanel" to="/AdminPanel" className="hover:underline">
                            Admin Panel
                        </Link>
                    )}
                </nav>

                <div className="hidden md:flex items-center space-x-6">
                    <CartBtn />
                    {isAuthenticated ? (
                        <>
                            <span className="text-black">{userRole}</span>
                            <button
                                onClick={handleLogout}
                                className="text-black hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/Login" className="text-black hover:underline">
                            Login/Register
                        </Link>
                    )}
                </div>
            </div>

            <BurgerMenu
                isOpen={isNavOpen}
                onClose={() => setIsNavOpen(false)}
                userRole={userRole}
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
            />
        </header>
    );
};

export default NavBar;
