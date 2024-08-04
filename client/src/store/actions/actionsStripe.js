import { createCheckout } from '../services/stripeService';

export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

export const checkoutAction = (paymentData) => async (dispatch) => {
  dispatch({ type: CHECKOUT_REQUEST });
  try {
    const checkoutSession = await createCheckout(paymentData);
     dispatch({
      type: CHECKOUT_SUCCESS,
      url: checkoutSession
    });
  } catch (error) {
     dispatch({
      type: CHECKOUT_FAILURE,
      error: error.message
    });
  }
};
