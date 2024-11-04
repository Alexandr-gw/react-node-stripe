import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import cartService from '../store/services/cartServices'; 
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const initializeCartQuantity = async () => {
        const token = Cookies.get('token');
        setLoading(true);

        try {
            if (token) {
                const cartData = await cartService.getCart(); 
                
                const uniqueItemsCount = cartData.items.length;
                setTotalItems(uniqueItemsCount);
            } else {
                const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
                const uniqueItemsCount = storedCart.items.length; 
                setTotalItems(uniqueItemsCount);
            }
        } catch (err) {
            setError('Failed to load cart data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeCartQuantity();
    }, []);

    const incrementTotalQuantity = () => setTotalItems((prev) => prev + 1);

    const decrementTotalQuantity = (count = 1) => setTotalItems((prev) => Math.max(prev - count, 0));

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
            cart.totalUniqueItems = totalItems; 
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [totalItems]);

    return (
        <CartContext.Provider value={{ totalItems, incrementTotalQuantity, decrementTotalQuantity, loading, error }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
