const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Diagnostic Route for Deployment Verification
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    version: '2.0.0-guest-checkout',
    timestamp: new Date() 
  });
});

// Hardened Route Mounting
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Fallback for 404s on API routes to help debugging
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API Endpoint Not Found',
    path: req.originalUrl,
    method: req.method,
    suggestion: 'Verify that your deployment has successfully finished and the server has restarted.'
  });
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Drift Garage API is running...');
});

// Error Middleware
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
