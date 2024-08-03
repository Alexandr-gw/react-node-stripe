import {
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
} from '../actions/actionsStripe';


const initialState = {
  url: null,
  loading: false,
  error: null
}
const stripeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return { ...state, loading: true, error: null };
    case CHECKOUT_SUCCESS: {
      state = {
        url: action.payload.url,
        loading: false,
        error: null
      }
      return { ...state, loading: false, error: null };
    }
    case CHECKOUT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default stripeReducer;
