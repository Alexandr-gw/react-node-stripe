import { createPaymentIntent } from '../services/stripeService';

export const CREATE_PAYMENT_INTENT_REQUEST = 'CREATE_PAYMENT_INTENT_REQUEST';
export const CREATE_PAYMENT_INTENT_SUCCESS = 'CREATE_PAYMENT_INTENT_SUCCESS';
export const CREATE_PAYMENT_INTENT_FAILURE = 'CREATE_PAYMENT_INTENT_FAILURE';

export const createPaymentIntentAction = (paymentData) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_INTENT_REQUEST });
  try {
    const paymentIntent = await createPaymentIntent(paymentData);
     dispatch({
      type: CREATE_PAYMENT_INTENT_SUCCESS,
      payload: paymentIntent
    });
  } catch (error) {
     dispatch({
      type: CREATE_PAYMENT_INTENT_FAILURE,
      error: error.message
    });
  }
};
