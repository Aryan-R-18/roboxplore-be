import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  leaderName: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  leaderRegdNo: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  teamSize: {
    type: Number,
    required: true,
    enum: [4, 5]
  },
  members: {
    member2: {
      type: String,
      required: true,
      trim: true
    },
    member3: {
      type: String,
      required: true,
      trim: true
    },
    member4: {
      type: String,
      required: true,
      trim: true
    },
    member5: {
      type: String,
      trim: true
    }
  },
  paymentScreenshot: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
