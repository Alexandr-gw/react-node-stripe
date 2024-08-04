import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe } from '@stripe/react-stripe-js';
import { checkoutAction } from '../store/actions/actionsStripe';

const CheckoutButton = ({ book }) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const [response, setResponse] = useState(false);
  const { url, loading, error } = useSelector(state => state.stripe);

  useEffect(() => {
    if (url && response) {
      window.location.replace(url);
      setResponse(false)
    }
  }, [url, dispatch]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || loading) {
      return;
    }
    const paymentData = {
      quantity: 1,
      id: book.id
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
