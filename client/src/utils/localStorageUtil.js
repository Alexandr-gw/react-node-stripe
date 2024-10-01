const CART_KEY = 'cart_items';

export const loadCartFromLocalStorage = () => {
  const serializedCart = localStorage.getItem(CART_KEY);
  return serializedCart ? JSON.parse(serializedCart) : [];
};

export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart.items));
};
