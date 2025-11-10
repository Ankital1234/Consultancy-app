const express = require('express');
const router = express.Router();
const { createApplication, getApplication, listApplications } = require('../controllers/consultantApplicationController');

router.get('/', listApplications);
router.post('/', createApplication);
router.get('/:id', getApplication);

module.exports = router;
