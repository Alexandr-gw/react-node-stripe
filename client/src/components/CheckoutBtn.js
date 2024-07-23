import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const CheckoutButton = ({ price }) => {
  const stripe = useStripe();

  const handleCheckout = async () => {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: 'price_1PdMZkRtZj5jJHBhMrk1XFDy', 
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={!stripe} className="checkout-btn">
      Checkout
    </button>
  );
};

export default CheckoutButton;
