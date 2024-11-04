import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/actionsCart';
import Cookies from 'js-cookie';
import { useCart } from '../../context/CartContext';

const AddToCart = ({ product }) => {
  const { incrementTotalQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      incrementTotalQuantity();
    }

    const token = Cookies.get('token');
    if (token) {
      const item = { items: [{ productId: product.id, quantity: quantity }] };
      dispatch(addToCart(item));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const existingProductIndex = cart.items.findIndex(item => item.productId === product.id);
      if (existingProductIndex !== -1) {
        cart.items[existingProductIndex].quantity += quantity;
      } else {
        cart.items.push({ ...product, productId: product.id, quantity: quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-transform transform shadow-lg"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
