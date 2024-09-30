const jwt = require('jsonwebtoken');

const extractTokenAndUserId = (authorization) => {
    if (!authorization) return null;
    const token = authorization.split(' ')[1];

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        return userId;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    extractTokenAndUserId
}