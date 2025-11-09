const Company = require('../models/Company');

async function createCompany(req, res) {
  try {
    const company = new Company(req.body);
    await company.save();
    return res.status(201).json({ message: 'Company created', company });
  } catch (err) {
    console.error('Create company error:', err);
    return res.status(400).json({ message: 'Invalid company data', error: err.message });
  }
}

async function getCompanies(req, res) {
  try {
    const list = await Company.find().sort({ createdAt: -1 });
    return res.status(200).json(list);
  } catch (err) {
    console.error('Get companies error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createCompany, getCompanies };
