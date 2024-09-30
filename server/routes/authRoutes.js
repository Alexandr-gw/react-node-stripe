const express = require('express');
const { register, login,verifyAndRenewToken } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-token', verifyAndRenewToken);

module.exports = router;