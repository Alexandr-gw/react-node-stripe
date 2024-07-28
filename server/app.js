const express = require('express');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rootRoute = require('./routes/rootRoute');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//app.use('/api/payment', paymentRoutes);
app.use('/api/stripeRoutes', stripeRoutes);
app.use('/api/books', bookRoutes);
app.use('/', rootRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
