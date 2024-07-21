const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/checkout', async (req, res) => {
  try {
    const { token, amount } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token.id,
      description: 'Test Charge',
    });
    res.status(200).json({ success: true, charge });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
