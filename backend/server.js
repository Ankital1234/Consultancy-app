// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth'); // ensure this path exists
const consultantApplicationsRoutes = require('./routes/consultantApplications');
const consultantsRoutes = require('./routes/consultants');
const uploadsRoutes = require('./routes/uploads');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  console.log('--- incoming request ---', req.method, req.path, 'origin:', req.headers.origin);
  next();
});
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// static file hosting for uploaded assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/ping', (req, res) => res.json({ message: 'pong' }));
app.use('/api/auth', authRoutes);
app.use('/api/consultant-applications', consultantApplicationsRoutes);
app.use('/api/consultants', consultantsRoutes);
app.use('/api/uploads', uploadsRoutes);
app.get('/', (req, res) => res.send('Consultancy backend is up'));

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/consultancy';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
