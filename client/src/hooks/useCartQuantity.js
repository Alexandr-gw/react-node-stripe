import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getCart } from '../../src/store/actions/actionsCart';

const useCartQuantity = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('token');
    const serverCart = useSelector((state) => state.cart.cart?.cart || []);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        if (token) {
            dispatch(getCart());
        } else {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
            const quantity = storedCart.items.reduce((total, item) => total + item.quantity, 0);
            setTotalQuantity(quantity);
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (token) {
            const quantity = serverCart.reduce((total, item) => total + item.quantity, 0);
            setTotalQuantity(quantity);
        }
    }, [serverCart, token]);

    const incrementTotalQuantity = () => {
        setTotalQuantity((prev) => {
            const newTotal = prev + 1;
            if (!token) {
                const updatedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
                updatedCart.totalQuantity = newTotal; 
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
            return newTotal;
        });
    };

    const decrementTotalQuantity = () => {
        setTotalQuantity((prev) => {
            const newTotal = Math.max(prev - 1, 0); 
            if (!token) {
                const updatedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
                updatedCart.totalQuantity = newTotal; 
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
            return newTotal;
        });
    };
    console.log('hook>', totalQuantity)
    
        return { totalQuantity, incrementTotalQuantity, decrementTotalQuantity };
     

};

export default useCartQuantity;
