const mongoose = require('mongoose');

const InvestorRequestSchema = new mongoose.Schema({
  investorName: {
    type: String,
    required: true,
    ref: 'Investor', 
  },
  startupName: {
    type: String,
    required: true,
    ref: 'Startup',
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
});

const InvestorRequest = mongoose.model('InvestorRequest', InvestorRequestSchema);

module.exports = InvestorRequest;
