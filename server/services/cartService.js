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

const updateCartItem = async (itemId, quantity) => {
  const cartItem = await CartItem.findByPk(itemId);
  if (!cartItem) {
    throw new Error('Cart item not found');
  }
  await cartItem.update({ quantity });
  return cartItem;
};

const removeFromCart = async (itemId) => {
  const cartItem = await CartItem.findByPk(itemId);
  if (!cartItem) {
    throw new Error('Cart item not found');
  }
  await cartItem.destroy();
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ where: { userId } });
  if (!cart) {
    throw new Error('Cart not found');
  }
  await CartItem.destroy({ where: { cartId: cart.id } });
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
}