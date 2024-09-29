const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getCart);
router.post('/add', authenticateToken, addToCart);
router.put('/update/:itemId', authenticateToken, updateCartItem);
router.delete('/remove/:itemId', authenticateToken, removeFromCart);
router.delete('/clear', authenticateToken, clearCart);

module.exports = router;
