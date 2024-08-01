import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntentAction } from '../store/actions/actionsStripe';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`, // Redirect URL on success
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      setError(null);
      setLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={loading || !stripe || !elements} id="submit">
        {loading ? <div className="spinner" id="spinner"></div> : 'Pay Now'}
      </button>
      {error && <div id="payment-message">{error}</div>}
    </form>
  );
};

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { clientSecret, loading, error } = useSelector(state => state.stripe);
  const [paymentData, setPaymentData] = useState({
    amount: 123,
    currency: 'usd',
    paymentMethodId: 'card',
  });

  useEffect(() => {
    dispatch(createPaymentIntentAction(paymentData));
  }, [dispatch, paymentData]);

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
