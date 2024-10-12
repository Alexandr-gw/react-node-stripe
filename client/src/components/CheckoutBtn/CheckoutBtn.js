import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe } from '@stripe/react-stripe-js';
import { checkoutAction } from '../../store/actions/actionsStripe';

const CheckoutButton = ({ books }) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const [response, setResponse] = useState(false);
  const { url, loading } = useSelector(state => state.stripe);
  const cartItems = books.map(({ price, ...rest }) => rest)

  useEffect(() => {
    if (url && response) {
      window.location.replace(url.url);
      setResponse(false)
    }
  }, [url, dispatch]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || loading) {
      return;
    }

    const paymentData = {
      items: cartItems
    };
    
    dispatch(checkoutAction(paymentData));
    setResponse(true)
  };
  return (
    <div>
      <button type="submit" className='checkout-btn' onClick={handleSubmit}>Pay</button>
    </div>
  );

}
export default CheckoutButton;
