import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutForm, useStripe, useElements, Elements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import { createPaymentIntentAction } from '../store/actions/actionsStripe';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from './CheckoutPage';

const CheckoutButton = ({ book }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [onCheckout, setOnCheckout] = useState(false);
  const [successIntent, setSuccessIntent] = useState(false);
  const { clientSecret, loading, error } = useSelector(state => state.stripe);


  useEffect(() => {
    if (onCheckout) {
      dispatch(createPaymentIntentAction(paymentData));
      setOnCheckout(false);
    }
    if (clientSecret) {
      setSuccessIntent(true);
    }
    //handle with after action logic here
  }, [onCheckout, clientSecret])

  const paymentData = {
    amount: book.price * 100,
    currency: 'usd',
    paymentMethodId: 'card',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!stripe || !elements || loading) {
      // Prevent double submissions or submissions without Stripe fully loaded
      return;
    }
    if (error) {
      console.error("Error:", error);
      return; // Stop if there's an error with the payment method
    }
    setOnCheckout(true);
  };
  if (successIntent) {
    //  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      //  stripePromise
    };
    //console.log('stripePromise----->', stripePromise, '=========', { clientSecret: clientSecret })
    // return (

    // //  <CheckoutPage book={book} />
    // )
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <Link to='/CheckoutPage' className='checkout-btn' onClick={handleSubmit}> Pay</Link>
      </form>
    );
  }
}
export default CheckoutButton;
