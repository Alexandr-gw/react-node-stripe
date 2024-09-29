const express = require('express');
const { getUsers, editUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['admin', 'user']), getUsers);
router.put('/:id', authenticateToken, authorizeRole(['admin', 'user']), editUser);
router.delete('/:id', authenticateToken, authorizeRole(['admin', 'user']), deleteUser);


module.exports = router;
