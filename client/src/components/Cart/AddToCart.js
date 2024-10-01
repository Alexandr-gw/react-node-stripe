import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/actionsCart';

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const item = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    dispatch(addToCart(item));
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
