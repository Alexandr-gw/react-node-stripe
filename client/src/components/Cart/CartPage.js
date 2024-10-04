import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItems';
import { getCart, clearCart } from '../../store/actions/actionsCart';
import { getBooks } from '../../store/actions/actionsBook';
import LoadingPage from '../LoadingPage/LoadingPage';
import './CartPage.css';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart?.cart) || {};
    const loading = useSelector((state) => state.cart.loading);
    const books = useSelector((state) => state.books.books) || [];

    const [totalPrice, setTotalPrice] = useState(0); 
    useEffect(() => {
        dispatch(getCart());
        dispatch(getBooks());
    }, [dispatch]);

   
    useEffect(() => {
        if (cart.items && books.length) {
            const newTotal = cart.items.reduce((acc, item) => {
                const book = books.find((b) => b.id === item.productId);
                if (book) {
                    return acc + item.quantity * parseFloat(book.price);
                }
                return acc;
            }, 0);
            setTotalPrice(newTotal);
        }
    }, [cart.items, books, totalPrice]); 

    const handleClearCart = () => {
        dispatch(clearCart());
        setTotalPrice(0); 
    };

    if (loading) {
        return <LoadingPage />;
    }

    if (!cart.items || cart.items.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="cart-page-wrapper">
            <h2>Your Shopping Cart</h2>
            <div className="cart-items">
                {cart.items.map((item) => (
                    <CartItem key={item.productId} item={item} books={books} />
                ))}
            </div>
            <div className="cart-total">
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
            <div className="cart-actions">
                <button onClick={handleClearCart}>Clear Cart</button>
            </div>
        </div>
    );
};

export default CartPage;
