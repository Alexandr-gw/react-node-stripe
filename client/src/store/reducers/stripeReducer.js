import {
  CREATE_PAYMENT_INTENT_REQUEST,
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT_FAILURE
} from '../actions/actionsStripe';


const initialState = {
  clientSecret: null,
  loading: false,
  error: null
}
const stripeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_INTENT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PAYMENT_INTENT_SUCCESS: {
      state = {
        clientSecret: action.payload.clientSecret,
        loading: false,
        error: null
      }
      return { ...state, loading: false, error: null };
    }
    case CREATE_PAYMENT_INTENT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default stripeReducer;
