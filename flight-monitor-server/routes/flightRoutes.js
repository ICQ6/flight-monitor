const express = require('express');
const FlightMonitor = require('../models/flight');

const router = express.Router();

router.post('/flight-data', async (req, res) => {
  try {
    const { altitude, his, adi } = req.body;

    if (!altitude || !his || !adi) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFlightData = new FlightMonitor({
      altitude: { value: altitude },
      his: { value: his },
      adi: { value: adi }
    });

    const savedData = await newFlightData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
