import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutForm, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { createPaymentIntentAction } from '../store/actions/actionsStripe';
import { loadStripe } from "@stripe/stripe-js";

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
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
    console.log(stripePromise)
    return (<div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>)
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit" className='checkout-btn'>Pay</button>
      </form>
    );
  }
}
export default CheckoutButton;
