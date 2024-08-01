const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

module.exports = stripe;
