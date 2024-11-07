import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartBtn = () => {
    const { totalItems } = useCart();

    return (
        <Link
            to="/cart"
            className="cart-btn flex items-center space-x-2 p-2 rounded-full"
        >
            {totalItems > 0 ? (
                <span className="cart-count text-lg font-semibold text-black hover:underline">
                    Cart ({totalItems})
                </span>
            ) : (
                <span className="cart-empty text-lg text-black hover:underline">
                    Cart
                </span>
            )}
        </Link>
    );
};

export default CartBtn;
