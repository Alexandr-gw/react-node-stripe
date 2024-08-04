import axios from 'axios';

const API_URL = 'http://localhost:8080/api/payment/create-checkout-session';

export const createCheckout = async (paymentData) => {
  const response = await axios.post(API_URL, paymentData);
  if (response.status === 200) {
    return response.data;
  } else {
   console.log(response)
  }
};
