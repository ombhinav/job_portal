const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    appliedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;