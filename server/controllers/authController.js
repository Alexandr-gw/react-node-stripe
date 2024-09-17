const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
require('dotenv').config();

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(StatusCodes.CREATED).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST ).json({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.status(StatusCodes.OK).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Error logging in', error });
    }
};

const verifyAndRenewToken = async (req, res) => {
    const { token } = req.body;
    try {
   if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
    }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const newToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(StatusCodes.OK).json({ message: 'Token renewed successfully', newToken });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token', error });
    }
};

module.exports = { register, login , verifyAndRenewToken};
