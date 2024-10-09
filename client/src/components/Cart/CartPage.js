import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import CartItem from './CartItems';
import { getCart, clearCart } from '../../store/actions/actionsCart';
import { getBooks } from '../../store/actions/actionsBook';
import LoadingPage from '../LoadingPage/LoadingPage';
import CheckoutButton from '../CheckoutBtn/CheckoutBtn';
import './CartPage.css';

const CartPage = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('token');
    const serverCart = useSelector((state) => state.cart.cart?.cart || {});
    const books = useSelector((state) => state.books.books || []);
    const serverLoading = useSelector((state) => state.cart.loading);

    const [localCart, setLocalCart] = useState([]);
    const [cart, setCart] = useState(serverCart || localCart);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            dispatch(getCart());
        } else {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
            setLocalCart(storedCart);
            setLoading(false);
        }
        dispatch(getBooks());
    }, [dispatch, token]);

    useEffect(() => {
        const currentCart = token ? serverCart : localCart;

        if (JSON.stringify(currentCart) !== JSON.stringify(cart)) {
            setCart(currentCart);
console.log('currentCart', currentCart)
            const initialTotal = currentCart.items
                ? currentCart.items.reduce((sum, item) => {
                    const book = books.find((b) => b.id === item.productId);
                    return sum + (book ? item.quantity * book.price : 0);
                }, 0)
                : 0;
            setTotalPrice(initialTotal);
        }
    }, [serverCart, localCart, books, token, cart]);


    useEffect(() => {
        if (token) {
            setLoading(serverLoading);
        } else {
            setLoading(false);
        }
    }, [serverLoading, token]);

    const handleQuantityChange = (productId, newQuantity, oldQuantity, price) => {
        const difference = newQuantity - oldQuantity;
        setTotalPrice((prevTotal) => prevTotal + difference * price);

        if (!token) {
            const updatedCart = localCart.map((item) =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            );
            setLocalCart(updatedCart);
            localStorage.items.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleRemoveItem = (productId) => {
        const updatedItems = cart.items.filter((item) => item.productId !== productId);
        if (token) {
            cart.items = updatedItems;
        } else {
            const updatedCart = localCart.filter((item) => item.productId !== productId);
            setLocalCart(updatedCart);
            localStorage.items.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleClearCart = () => {
        if (token) {
            dispatch(clearCart());
        } else {
            setLocalCart([]);
            localStorage.items.setItem('cart', JSON.stringify([]));
        }
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
                        key={item.productId || item.id}
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
