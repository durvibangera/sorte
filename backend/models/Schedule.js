const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    trim: true
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#3788d8'
  },
  recurrence: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
    default: 'none'
  },
  googleEventId: {
    type: String,
    sparse: true
  }
}, {
  timestamps: true
});

// Add index for efficient querying
scheduleSchema.index({ startTime: 1, endTime: 1 });

// Validate that endTime is after startTime
scheduleSchema.pre('save', function(next) {
  if (this.endTime <= this.startTime) {
    next(new Error('End time must be after start time'));
  }
  next();
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule; 