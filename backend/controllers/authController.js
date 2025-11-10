// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Consultant = require('../models/Consultant');
const Company = require('../models/Company');

const SALT_ROUNDS = 10;

async function signup(req, res) {
  try {
    const { role, fullName, email, password } = req.body;

    if (!role || !fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide role, fullName, email and password' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      role,
      fullName,
      email: email.toLowerCase().trim(),
      password: hash
    });

    await user.save();

    // Create role-specific document
    try {
      if (role === 'consultant') {
        await Consultant.create({ fullName, email: email.toLowerCase().trim() });
      } else if (role === 'company') {
        await Company.create({ name: fullName, email: email.toLowerCase().trim() });
      }
    } catch (subErr) {
      // Don't fail signup if profile creation fails; log and continue
      console.error('Role profile creation error:', subErr);
    }

    const safeUser = {
      id: user._id,
      role: user.role,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt
    };

    return res.status(201).json({ message: 'Account created', user: safeUser });
  } catch (err) {
    console.error('Signup error:', err);
    if (err && (err.code === 11000 || (err.name === 'MongoServerError' && err.code === 11000))) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    return res.status(500).json({ message: 'Server error', error: err?.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const safeUser = {
      id: user._id,
      role: user.role,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt
    };

    return res.status(200).json({ message: 'Login successful', user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error', error: err?.message });
  }
}

module.exports = {
  signup,
  login
};
