const { Cart, CartItem } = require('../models/cart');

const getCart = async (userId) => {
  try {
    let cart = await Cart.findOne({
      where: { userId },
      include: [{
        model: CartItem,
        attributes: ['productId', 'quantity', 'price'],
      }]
    });

    if (!cart) {
      cart = await Cart.create({ userId });
      return { message: 'Cart just created. Cart is empty', cart: { id: cart.id }, totalPrice: 0 };
    }

    if (!cart.CartItems || cart.CartItems.length === 0) {
      return { message: 'Cart is empty', cart: { id: cart.id }, totalPrice: 0 };
    }

    const totalPrice = cart.CartItems.reduce((sum, item) => sum + Number(item.price), 0);

    return {
      cart: {
        id: cart.id,
        items: cart.CartItems,
        totalPrice: totalPrice.toFixed(2)
      },
      message: 'Cart retrieved successfully'
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Error fetching cart');
  }
};
const addToCart = async (userId, productId, quantity, price) => {
  let cart = await getCart(userId);
  let cartItem = await CartItem.findOne({ where: { cartId: cart.cart.id, productId } });

  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.price = (Number(cartItem.price) + price).toFixed(2);
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({ cartId: cart.cart.id, productId, quantity, price });
  }

  return cartItem;
};

const updateCartItem = async (userId, productId, quantity, price) => {
  try {
    const cartData = await getCart(userId);
    const cartId = cartData.cart.id;
    const cartItem = await CartItem.findOne({ where: { cartId, productId } });
    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    await cartItem.update({ quantity, price: price });

    return cartItem;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw new Error('Failed to update cart item');
  }
};

const removeFromCart = async (userId, productId) => {
  try {
    const cartData = await getCart(userId);
    const cartId = cartData.cart.id;
    const cartItem = await CartItem.findOne({ where: { cartId, productId } });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    await cartItem.destroy();

    return { message: 'Item removed from cart successfully' };
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw new Error('Failed to remove item from cart');
  }
};

const clearCart = async (userId) => {
  try {
    const cartData = await getCart(userId);
    const cartId = cartData.cart.id;
    const cartItems = await CartItem.findAll({ where: { cartId } });

    if (!cartItems || cartItems.length === 0) {
      return { message: 'Cart is already empty' };
    }

    await CartItem.destroy({ where: { cartId } });

    return { message: 'Cart cleared successfully' };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart');
  }
};

const getCartItemById = async (userId,productId) => {
  try {
    const cartData = await getCart(userId);
    const cartId = cartData.cart.id;
    const cartItem = await CartItem.findOne({ where: { cartId, productId } });
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
    return cartItem;
  } catch (error) {
    console.error('Error fetching cart item:', error);
    throw new Error('Failed to fetch cart item');
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartItemById
}