const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { getCart } = require('../services/cartService');
const { createCheckoutSession } = require('../services/stripeService');
const { getBookById } = require('../services/bookService');
const { extractTokenAndUserId } = require('../utils/extractTokenAndUserId');
const { cartItemSchema } = require('../validator/cartValidator');

const handleCreateCheckoutSession = async (req, res) => {
  let cartItems;
  let userId;
  const authorization = req.headers.authorization || req.query.authorization;

  try {
    if (authorization) {
      userId = extractTokenAndUserId(authorization);

      const { cart } = await getCart(userId);
      if (!cart || cart.items.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Cart is empty' });
      }

      cartItems = await Promise.all(cart.items.map(async (item) => {
        const book = await getBookById(item.productId);
        if (!book.stripePriceId) {
          throw new Error(`Book with ID ${item.productId} does not have a Stripe price ID`);
        }
        return {
          price: book.stripePriceId,
          quantity: item.quantity,
        };
      }));
    } else {
      cartItems = req.body.items;

      if (!cartItems || cartItems.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Cart is empty' });
      }

      const { error } = Joi.array().items(cartItemSchema).validate(cartItems);
      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
      }

      cartItems = await Promise.all(cartItems.map(async (item) => {
        const book = await getBookById(item.productId);
        if (!book.stripePriceId) {
          throw new Error(`Book with ID ${item.productId} does not have a Stripe price ID`);
        }
        return {
          price: book.stripePriceId,
          quantity: item.quantity,
        };
      }));
    }

    const session = await createCheckoutSession(cartItems);
    return res.status(StatusCodes.OK).json({ url: session.url });

  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    if (error.message === 'Invalid or expired token') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized access' });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create checkout session' });
  }
};

module.exports = { handleCreateCheckoutSession };
