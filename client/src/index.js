import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/reset.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
