const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const tokenFromQuery = req.query['authorization']?.split(' ')[1];
    const tokenFromHeader = req.headers['authorization']?.split(' ')[1];
    
    const token = tokenFromHeader || tokenFromQuery;

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
