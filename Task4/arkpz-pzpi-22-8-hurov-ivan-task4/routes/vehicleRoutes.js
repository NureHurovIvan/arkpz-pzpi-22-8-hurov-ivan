const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/vehicles', authenticate, authorize(['admin']), vehicleController.getAllVehicles);

module.exports = router;
