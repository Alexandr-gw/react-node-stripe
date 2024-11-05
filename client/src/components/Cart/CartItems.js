import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item, books, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { decrementTotalQuantity } = useCart();
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
    decrementTotalQuantity();
  };

  const lineTotal = (quantity * book.price).toFixed(2);

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg flex justify-between items-center mb-4">
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold text-gray-800">
          {book.title} by {book.author}
        </h4>
        <div className="mt-2 flex items-center space-x-4">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-lg font-medium text-gray-700">
            Total: ${lineTotal}
          </span>
        </div>
      </div>
      <button
        onClick={handleRemoveItem}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
