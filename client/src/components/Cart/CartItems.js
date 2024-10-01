import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../../store/actions/actionsCart';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const lineTotal =  item.price;

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10)); 
    setQuantity(value);
    dispatch(updateCartItem(item.productId, value));
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.productId));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h4>{item.productName}</h4>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <span>Total: ${lineTotal}</span>
      </div>
      <button onClick={handleRemoveItem}>Remove</button>
    </div>
  );
};

export default CartItem;
