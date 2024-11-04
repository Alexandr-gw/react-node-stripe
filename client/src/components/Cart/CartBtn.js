import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 

const CartBtn = () => {
    const { totalItems } = useCart();

    return (
        <Link
            to="/cart"
            className="cart-btn flex items-center space-x-2 p-2 rounded-full bg-yellow-300 hover:bg-yellow-400 transition duration-200 ease-in-out"
        >
            <span className="cart-icon">🛒</span>
            {totalItems > 0 ? (
                <span className="cart-count text-lg font-semibold text-green-900">
                    Cart ({totalItems})
                </span>
            ) : (
                <span className="cart-empty text-lg font-semibold text-green-900">
                    Cart (Empty)
                </span>
            )}
        </Link>
    );
};

export default CartBtn;
