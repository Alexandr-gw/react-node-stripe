import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import CartItem from './CartItems';
import { getCart, clearCart, updateCartItem, removeFromCart } from '../../store/actions/actionsCart';
import { getBooks } from '../../store/actions/actionsBook';
import LoadingPage from '../LoadingPage/LoadingPage';
import CheckoutButton from '../CheckoutBtn/CheckoutBtn';

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

            const transformedCart = {
                items: storedCart.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                }))
            };

            setLocalCart(transformedCart);
            setLoading(false);
        }
        dispatch(getBooks());
    }, [dispatch]);


    useEffect(() => {
        const currentCart = token ? serverCart : localCart;

        if (JSON.stringify(currentCart) !== JSON.stringify(cart)) {
            setCart(currentCart);
            const initialTotal = currentCart.items
                ? currentCart.items.reduce((sum, item) => {
                    const book = books.find((b) => b.id === item.productId);
                    return sum + (book ? item.quantity * book.price : 0);
                }, 0)
                : 0;
            setTotalPrice(initialTotal);
        }
    }, [books]);


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

        if (token) {
            dispatch(updateCartItem(productId, newQuantity));
        } else {
            const updatedCartItems = cart.items.map((item) =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            );
            setCart({ ...cart, items: updatedCartItems });
            localStorage.setItem('cart', JSON.stringify({ items: updatedCartItems }));
        }
    };

    const handleRemoveItem = (productId) => {
        const updatedItems = cart.items.filter((item) => item.productId !== productId);
        if (token) {
            const updatedCart = { ...cart, items: updatedItems };
            setCart(updatedCart);
            dispatch(removeFromCart(productId));
        } else {
            const updatedCart = { ...localCart, items: updatedItems };
            setLocalCart(updatedCart);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleClearCart = () => {
        if (token) {
            setCart({ items: [] });
            dispatch(clearCart());
        } else {
            setLocalCart({ items: [] });
            setCart({ items: [] });
            localStorage.setItem('cart', JSON.stringify({ items: [] }));
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
        <div className="max-w-7xl mx-auto p-6 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h2>
            <div className="space-y-4 mb-8">
                {cart.items.length > 0 ? (
                    cart.items.map((item) => (
                        <CartItem
                            key={item.productId || item.id}
                            item={item}
                            books={books}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                        />
                    ))
                ) : (
                    <p className="text-lg text-gray-700">Your cart is empty.</p>
                )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-2xl font-semibold text-gray-700">
                    Total Price: <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                </h3>
            </div>
            <div className="flex justify-between items-center space-x-4">
                <button
                    onClick={handleClearCart}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                >
                    Clear Cart
                </button>
                <CheckoutButton books={cart.items} />
            </div>
        </div>

    );
};

export default CartPage;
