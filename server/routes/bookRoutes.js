const express = require('express');
const { getBooks } = require('../controllers/bookController');
const router = express.Router();

router.get('/', (req, res) => {
   getBooks(req, res); 
   res.status(200).json({ message: 'Server is running!' });
});


module.exports = router;
