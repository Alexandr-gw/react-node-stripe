const express = require('express');
const { getUsers, editUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/users', authenticateToken, authorizeRole(['admin', 'user']), getUsers);//remove user after 
router.put('/users/:id', authenticateToken, authorizeRole(['admin', 'user']), editUser);
router.delete('/users/:id', authenticateToken, authorizeRole(['admin', 'user']), deleteUser);


module.exports = router;
