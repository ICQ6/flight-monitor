const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('./routes/flightRoutes');

const app = express();
const PORT = 5000;
const mongoDB_URL = 'mongodb://localhost:27017/flightMonitorDB';

app.use(cors());
app.use(express.json());

// חיבור למסד הנתונים
mongoose.connect(mongoDB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', flightRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
