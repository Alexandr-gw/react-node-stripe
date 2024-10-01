import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItems';
import { getCart, clearCart } from '../../store/actions/actionsCart';
import LoadingPage from '../LoadingPage/LoadingPage';
import './CartPage.css';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart?.cart);
    const totalPrice = useSelector((state) => state.cart.cart.cart?.totalPrice || 0);
    const loading = useSelector((state) => state.cart.loading);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (loading) {
        return <LoadingPage />;
    } else {
        if (cart.items && cart.items.length > 0) {
            return (
                <div className="cart-page-wrapper">
                    <h2>Your Shopping Cart</h2>
                    <div className="cart-items">
                        {cart.items.map((item) => (
                            <CartItem key={item.productId} item={item} />
                        ))}
                    </div>
                    <div className="cart-total">
                        <h3>Total Price: ${totalPrice}</h3>
                    </div>
                    <div className="cart-actions">
                        <button onClick={handleClearCart}>Clear Cart</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="cart-page">
                    <div className="cart-items">
                        <p>Your cart is empty.</p>
                    </div>
                </div>
            );
        }

    }
};

export default CartPage;
