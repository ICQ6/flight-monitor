const mongoose = require('mongoose');


const flightSchema = new mongoose.Schema({
  altitude: {
    value: Number, 
    range: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 3000 }
    }
  },
  his: {
    value: Number,  
    rangeStart: { type: Number, default: 0 },
    rangeEnd: { type: Number, default: 360 }
  },
  adi: {
    value: Number,  
    rangeStart: { type: Number, default: -100 },
    rangeEnd: { type: Number, default: 100 }
  }
});

module.exports = mongoose.model('FlightMonitor', flightSchema);