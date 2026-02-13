// routes/registrarRoutes.js
const express = require('express');
const router = express.Router();
const registrarController = require('../controllers/registrarController');

// POST /registrar/receive-registration
router.post('/receive-registration', registrarController.receiveRegistration);

module.exports = router;
