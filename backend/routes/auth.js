// routes/auth.js
const express = require('express');
const router = express.Router();

// import functions from controller
const authController = require('../controllers/authController');

// Make sure authController.signup and authController.login are functions
if (!authController || typeof authController.signup !== 'function') {
  throw new Error('authController.signup is not a function. Check controllers/authController.js export.');
}

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
