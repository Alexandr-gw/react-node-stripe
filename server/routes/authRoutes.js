const express = require('express');
const { register, login,verifyAndRenewToken } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-token', verifyAndRenewToken);


//use as middleware for bookRoutes  

router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'Welcome to the admin panel' });
});

router.get('/user', authenticateToken, authorizeRole(['admin', 'user']), (req, res) => {
    res.json({ message: 'Welcome, user' });
});

module.exports = router;
