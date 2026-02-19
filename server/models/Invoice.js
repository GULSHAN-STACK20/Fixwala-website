const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PAID'],
    default: 'DRAFT'
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  balanceDue: {
    type: Number,
    default: 0
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate balanceDue before saving
invoiceSchema.pre('save', function(next) {
  this.balanceDue = this.total - this.amountPaid;
  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
