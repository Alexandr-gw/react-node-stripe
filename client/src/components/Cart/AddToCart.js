import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/actionsCart';
import Cookies from 'js-cookie';

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const token = Cookies.get('token');

    if (token) {
      const item = {
        items: [{
          productId: product.id,
          quantity: quantity
        }]
      };
      dispatch(addToCart(item));
    } else {
      let cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      product = { ...product, productId: product.id};
      cart.items.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  return (
    <div>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
