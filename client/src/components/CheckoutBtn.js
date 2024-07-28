import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutForm, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntentAction } from '../store/actions/actionsStripe';

const CheckoutButton = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { clientSecret, loading, error } = useSelector(state => state.stripe);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || loading) {
      // Prevent double submissions or submissions without Stripe fully loaded
      return;
    }
    if (error) {
      console.error("Error:", error);
      return; // Stop if there's an error with the payment method
    }

    // Assuming `price` is from props or state and currency is set
    const paymentData = {
      amount: 2000,  // Amount should be in cents and calculated as needed
      currency: 'usd',
      paymentMethodId: 'card',
    };

    // Dispatch the action to create a payment intent
    const response = await dispatch(createPaymentIntentAction(paymentData));

    window.location.replace(`${response}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={!stripe || loading} className='checkout-btn'>Pay</button>
      {error && <div>{error}</div>}
    </form>
  );

}
export default CheckoutButton;
