// routes/consultants.js
const express = require('express');
const router = express.Router();
const { createConsultant, getConsultants, getConsultantByEmail, getConsultantById } = require('../controllers/consultantController');

router.get('/', getConsultants);
router.post('/', createConsultant);
router.get('/by-email', getConsultantByEmail);
router.get('/:id', getConsultantById);

module.exports = router;
