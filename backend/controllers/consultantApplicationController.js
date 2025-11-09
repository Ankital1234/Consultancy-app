const ConsultantApplication = require('../models/ConsultantApplication');
const Consultant = require('../models/Consultant');

async function createApplication(req, res) {
  try {
    const appDoc = await ConsultantApplication.create(req.body);
    const { fullName, email, specialization, yearsOfExperience, bio, skills, profilePicture, aadharFront, aadharBack, panCard, certificates, hourlyRate } = req.body || {};
    const consultant = await Consultant.findOneAndUpdate(
      { email: (email || '').toLowerCase().trim() },
      {
        fullName: fullName || '',
        email: (email || '').toLowerCase().trim(),
        title: specialization || '',
        bio: bio || '',
        skills: Array.isArray(skills) ? skills : [],
        experienceYears: Number(yearsOfExperience) || 0,
        hourlyRate: Number(hourlyRate) || 0,
        profilePicture: profilePicture || undefined,
        aadharFront: aadharFront || undefined,
        aadharBack: aadharBack || undefined,
        panCard: panCard || undefined,
        certificates: Array.isArray(certificates) ? certificates : undefined,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.status(201).json({ application: appDoc, consultant });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid application data', error: err.message });
  }
}

async function listApplications(req, res) {
  try {
    const apps = await ConsultantApplication.find().sort({ createdAt: -1 });
    return res.status(200).json(apps);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getApplication(req, res) {
  try {
    const { id } = req.params;
    const doc = await ConsultantApplication.findById(id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(doc);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid id' });
  }
}

module.exports = { createApplication, getApplication, listApplications };
