// Express route handler for flight data – handles POST requests to save new flight records

const express = require('express');
const FlightMonitor = require('../models/flight');

const router = express.Router();

// POST /api/flight-data
// Validates and saves new flight data to the database
router.post('/flight-data', async (req, res) => {
  try {
    const { altitude, his, adi } = req.body;

    // Check for missing required fields
    if (!altitude || !his || !adi) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new flight data document
    const newFlightData = new FlightMonitor({
      altitude: { value: altitude },
      his: { value: his },
      adi: { value: adi }
    });

    // Save to database
    const savedData = await newFlightData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
