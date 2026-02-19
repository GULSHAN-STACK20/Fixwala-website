const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🔧'
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    default: '1-2 hours'
  },
  category: {
    type: String,
    enum: ['appliance', 'electrical', 'plumbing', 'other'],
    default: 'other'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
