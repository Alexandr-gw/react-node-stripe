import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CartItem = ({ item, books, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const book = useMemo(() => books.find((b) => b.id === item.productId), [books, item.productId]);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item]);

  if (!book) {
    return null;
  }

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    const previousQuantity = quantity;
    setQuantity(value);
    onQuantityChange(item.productId, value, previousQuantity, book.price);
  };

  const handleRemoveItem = () => {
    onRemove(item.productId);
  };

  const lineTotal = (quantity * book.price).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h4>{book.title} by {book.author}</h4>
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
