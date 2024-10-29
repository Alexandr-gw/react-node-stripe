const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rootRoute = require('./routes/rootRoute');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', express.static(path.join(__dirname, '/api/uploads')));

app.use('/api/payment', paymentRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/', rootRoute);

app.use(errorHandler);

module.exports = app;
