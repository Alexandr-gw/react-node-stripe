const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rootRoute = require('./routes/rootRoute');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/payment', paymentRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/', rootRoute);

app.use(errorHandler);

module.exports = app;
