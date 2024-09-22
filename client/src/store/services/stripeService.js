import axios from 'axios';

const API_URL = process.env.NODE_API_URL || 'http://localhost:8080/api/payment/create-checkout-session';

export const createCheckout = async (paymentData) => {
  try {
    const response = await axios.post(API_URL, paymentData);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Unexpected response status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
};

