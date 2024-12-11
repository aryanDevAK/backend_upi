// Backend for UPI Intent Payment Integration with Payment Confirmation

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simulated Database
let orders = [];

// Generate Payment Link Endpoint
app.post('/api/pay', (req, res) => {
  const { amount, upiId, name, transactionNote } = req.body;

  // Create a unique order ID
  const orderId = `ORD${Date.now()}`;
  const paymentLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${transactionNote}`;

  // Save order details
  orders.push({ orderId, amount, upiId, name, transactionNote, status: 'pending' });

  res.json({ paymentLink, orderId });
});

// Simulate Webhook for Payment Confirmation
app.post('/api/payment/webhook', (req, res) => {
  const { orderId, status } = req.body;

  // Find the order and update its status
  const order = orders.find((o) => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;

  if (status === 'success') {
    return res.status(200).json({ message: 'Payment confirmed', order });
  } else {
    return res.status(400).json({ message: 'Payment failed', order });
  }
});

// Endpoint to Check Order Status (For Testing)
app.get('/api/order/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.find((o) => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json({ order });
});

app.listen(5000, () => console.log('Server running on port 5000'));
