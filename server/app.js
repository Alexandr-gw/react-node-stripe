const express = require('express');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rootRoute = require('./routes/rootRoute');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/payment', paymentRoutes);
app.use('/api/books', bookRoutes);
app.use('/', rootRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
