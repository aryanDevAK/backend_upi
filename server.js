// Backend for UPI Intent Payment Integration

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// API Route
app.post('/api/pay', (req, res) => {
  const { amount, upiId, name, transactionNote } = req.body;

  if (!amount || !upiId || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const upiURL = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(transactionNote || 'UPI Payment')}`;

  return res.json({ paymentLink: upiURL });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
