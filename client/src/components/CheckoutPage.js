import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { createPaymentIntentAction } from '../store/actions/actionsStripe';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const { clientSecret, loading, error } = useSelector(state => state.stripe);
    const [isCheckoutInitiated, setIsCheckoutInitiated] = useState(false);

    // Define payment data here or fetch it from an API or state
    const paymentData = {
        amount: 12300,  // amount in cents for $123.00
        currency: 'usd',
        paymentMethodType: 'card',
    };

    useEffect(() => {
        // Only dispatch the payment intent action when checkout is initiated
        if (isCheckoutInitiated) {
            dispatch(createPaymentIntentAction(paymentData));
            setIsCheckoutInitiated(false);
        }
    }, [isCheckoutInitiated, dispatch]);

    useEffect(() => {
        // React to the change in clientSecret
        if (clientSecret) {
            console.log('Payment intent created, clientSecret is available');
        }
    }, [clientSecret]);

    const handleCheckout = () => {
        setIsCheckoutInitiated(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentElement id="payment-element" />
                    <button onClick={handleCheckout} disabled={loading}>
                        Start Payment
                    </button>
                </Elements>
            ) : (
                <button onClick={handleCheckout} disabled={loading}>
                    Initiate Checkout
                </button>
            )}
        </div>
    );
};

export default CheckoutPage;
