const cartService = require('../services/cartService');
const bookService = require('../services/bookService');
const { StatusCodes } = require('http-status-codes');

const getCart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const cart = await cartService.getCart(userId);
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch cart' });
  }
};

const addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { items } = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No items provided' });
    }

    let cartItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      const product = await bookService.getBookById(productId);
      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: `Product with ID ${productId} not found` });
      }

      const price = product.price;
      const totalPrice = price * quantity;

      const cartItem = await cartService.addToCart(userId, productId, quantity, totalPrice);
      cartItems.push(cartItem);
    }

    res.status(StatusCodes.OK).json({ message: 'Items added to cart successfully', cartItems });

  } catch (error) {
    console.error('Error adding items to cart:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to add items to cart' });
  }
};

const updateCartItem = async (req, res) => {
  const userId = req.user.userId;
  const { itemId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedItem = await cartService.updateCartItem(userId, itemId, quantity);
    res.status(StatusCodes.OK).json(updatedItem);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update cart item' });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user.userId;
  const { itemId } = req.params;
  try {
    await cartService.removeFromCart(userId, itemId);
    res.status(StatusCodes.OK).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to remove item from cart' });
  }
};

const clearCart = async (req, res) => {
  const userId = req.user.userId;
  try {
    await cartService.clearCart(userId);
    res.status(StatusCodes.OK).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to clear cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
