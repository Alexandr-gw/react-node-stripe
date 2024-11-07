import React from 'react';
import { Link } from 'react-router-dom';

const BurgerMenu = ({ isOpen, onClose, userRole, isAuthenticated, handleLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-0 w-[150vw] ml-[-14vw] h-screen bg-black bg-opacity-75 text-white p-8 z-50 transition-all duration-300 ease-in-out">
            <button onClick={onClose} className="text-white text-2xl mb-6">
                X
            </button>
            <nav className="space-y-6">
                <Link to="/" className="block p-4 hover:underline" onClick={onClose}>
                    Home
                </Link>
                <Link to="/BooksList" className="block p-4 hover:underline" onClick={onClose}>
                    Shop
                </Link>
                {userRole === 'admin' && (
                    <Link
                        to="/AdminPanel"
                        className="block p-4 hover:underline"
                        onClick={onClose}
                    >
                        Admin Panel
                    </Link>
                )}
                <Link to="/Cart" className="block p-4 hover:underline" onClick={onClose}>
                    Cart
                </Link>
                {isAuthenticated ? (
                    <>
                        <span className="block p-4">{userRole}</span>
                        <button
                            onClick={() => {
                                handleLogout();
                                onClose();
                            }}
                            className="block p-4 hover:underline"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/Login" className="block p-4 hover:underline" onClick={onClose}>
                        Login/Register
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default BurgerMenu;
