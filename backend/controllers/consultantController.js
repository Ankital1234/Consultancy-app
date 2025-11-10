const Consultant = require('../models/Consultant');

async function createConsultant(req, res) {
  try {
    const consultant = new Consultant(req.body);
    await consultant.save();
    return res.status(201).json({ message: 'Consultant created', consultant });
  } catch (err) {
    console.error('Create consultant error:', err);
    return res.status(400).json({ message: 'Invalid consultant data', error: err.message });
  }
}

async function getConsultants(req, res) {
  try {
    const list = await Consultant.find().sort({ createdAt: -1 });
    return res.status(200).json(list);
  } catch (err) {
    console.error('Get consultants error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getConsultantByEmail(req, res) {
  try {
    const email = (req.query.email || '').toLowerCase().trim();
    if (!email) return res.status(400).json({ message: 'email query param required' });
    const c = await Consultant.findOne({ email });
    if (!c) return res.status(404).json({ message: 'Consultant not found' });
    return res.status(200).json(c);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getConsultantById(req, res) {
  try {
    const { id } = req.params;
    const c = await Consultant.findById(id);
    if (!c) return res.status(404).json({ message: 'Consultant not found' });
    return res.status(200).json(c);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid id' });
  }
}

module.exports = { createConsultant, getConsultants, getConsultantByEmail, getConsultantById };
