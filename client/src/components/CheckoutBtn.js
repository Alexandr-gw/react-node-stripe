import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutForm, useStripe, useElements, Elements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import { checkoutAction } from '../store/actions/actionsStripe';
import { loadStripe } from "@stripe/stripe-js";

const CheckoutButton = ({ book }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { clientSecret, loading, error } = useSelector(state => state.stripe);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || loading) {
      return;
    }
    const paymentData = {
      quantity: 1,
      id: book.id
    };

    const response = await dispatch(checkoutAction(paymentData));

    window.location.replace(`${response}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className='checkout-btn'>Pay</button>
    </form>
  );

}
export default CheckoutButton;
