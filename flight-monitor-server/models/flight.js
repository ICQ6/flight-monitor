// Mongoose schema definition for flight data – stores altitude, HIS, and ADI values with their respective ranges

const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  // Altitude data with min/max range
  altitude: {
    value: Number,
    range: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 3000 }
    }
  },

  // HIS (Horizontal Indicator System) with start/end range
  his: {
    value: Number,
    rangeStart: { type: Number, default: 0 },
    rangeEnd: { type: Number, default: 360 }
  },

  // ADI (Attitude Direction Indicator) with start/end range
  adi: {
    value: Number,
    rangeStart: { type: Number, default: -100 },
    rangeEnd: { type: Number, default: 100 }
  }
});

module.exports = mongoose.model('FlightMonitor', flightSchema);
