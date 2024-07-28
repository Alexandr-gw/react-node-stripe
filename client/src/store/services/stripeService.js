import axios from 'axios';

const API_URL = 'http://localhost:8080/api/stripeRoutes/create-payment-intent';

export const createPaymentIntent = async (paymentData) => {
  const response = await axios.post(API_URL, paymentData);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Failed to create payment intent');
  }
};
