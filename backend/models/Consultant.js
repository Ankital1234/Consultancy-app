const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  title: { type: String, trim: true },
  bio: { type: String, trim: true },
  skills: { type: [String], default: [] },
  experienceYears: { type: Number, default: 0 },
  hourlyRate: { type: Number, default: 0 },
  availability: { type: String, enum: ['available', 'unavailable', 'busy'], default: 'available' },
  location: { type: String, trim: true },
  profilePicture: { type: String, trim: true },
  aadharFront: { type: String, trim: true },
  aadharBack: { type: String, trim: true },
  panCard: { type: String, trim: true },
  certificates: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Consultant', consultantSchema);
