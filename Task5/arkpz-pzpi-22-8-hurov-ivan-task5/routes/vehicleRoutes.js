const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const vehicleController = require('../controllers/vehicleController');

router.get('/vehicles', authenticate, authorize(['admin']), vehicleController.getAllVehicles);
router.get('/my-vehicles', authenticate, vehicleController.getUserVehicles);

module.exports = router;
