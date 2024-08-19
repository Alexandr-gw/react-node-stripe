import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/reset.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import App from "./App";
import configureStore from "./store/store/configureStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const store = configureStore();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);
