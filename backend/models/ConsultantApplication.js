const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  preview: { type: String },
  uploaded: { type: Boolean, default: false },
}, { _id: false });

const consultantApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  dateOfBirth: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
  specialization: { type: String, required: true },
  yearsOfExperience: { type: String, required: true },
  bio: { type: String, required: true },
  skills: { type: [String], default: [] },
  documents: { type: [documentSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('ConsultantApplication', consultantApplicationSchema);
