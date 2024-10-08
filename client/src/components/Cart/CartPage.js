import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItems';
import { getCart, clearCart } from '../../store/actions/actionsCart';
import { getBooks } from '../../store/actions/actionsBook';
import LoadingPage from '../LoadingPage/LoadingPage';
import './CartPage.css';
import CheckoutButton from '../CheckoutBtn/CheckoutBtn';

const CartPage = () => {
    const dispatch = useDispatch();
    let cart = useSelector((state) => state.cart.cart?.cart || {});
    const books = useSelector((state) => state.books.books || []);
    const loading = useSelector((state) => state.cart.loading);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        dispatch(getCart());
        dispatch(getBooks());
    }, [dispatch]);

    useEffect(() => {
        const initialTotal = cart.items
            ? cart.items.reduce((sum, item) => {
                const book = books.find((b) => b.id === item.productId);
                return sum + (book ? item.quantity * book.price : 0);
            }, 0)
            : 0;
        setTotalPrice(initialTotal);
    }, [cart.items, books]);

    const handleQuantityChange = (productId, newQuantity, oldQuantity, price) => {
        const difference = newQuantity - oldQuantity;
        setTotalPrice((prevTotal) => prevTotal + difference * price);
    };

    const handleRemoveItem = (productId) => {
        cart.items = cart.items.filter((item) => item.productId !== productId);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        setTotalPrice(0);
    };

    if (loading) {
        return <LoadingPage />;
    }

    if (!cart.items || cart.items.length === 0) {
        return <div className="cart-page-wrapper">Your cart is empty.</div>;
    }

    return (
        <div className="cart-page-wrapper">
            <h2>Your Shopping Cart</h2>
            <div className="cart-items">
                {cart.items.map((item) => (
                    <CartItem
                        key={item.productId}
                        item={item}
                        books={books}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                    />
                ))}
            </div>
            <div className="cart-total">
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
            <div className="cart-actions">
                <button onClick={handleClearCart}>Clear Cart</button>
                <CheckoutButton books={cart.items} />
            </div>
        </div>
    );
};

export default CartPage;
