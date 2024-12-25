// routes/maintenanceRoutes.js
const express = require('express');
const router = express.Router();
const Maintenance = require('../models/maintenance');

router.get('/vehicles/:id/maintenance', async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const maintenance = await Maintenance.find({ vehicle_id: vehicleId, resolved: false });
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving maintenance issues' });
  }
});

module.exports = router;
