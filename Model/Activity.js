const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Activity', activitySchema);
