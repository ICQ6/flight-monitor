// Main server entry point – sets up Express server, connects to MongoDB, and routes API requests

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('./routes/flightRoutes');

const app = express();
const PORT = 5000;
const mongoDB_URL = 'mongodb://localhost:27017/flightMonitorDB';

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Enable parsing JSON in request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoDB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use flight data routes under /api
app.use('/api', flightRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

