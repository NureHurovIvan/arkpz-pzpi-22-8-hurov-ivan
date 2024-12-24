const mongoose = require('mongoose');
const Vehicle = require('../models/vehicle');

// Add new vehicle
exports.addVehicle = async (req, res) => {
  const { user_id, make, model, year, vin_number } = req.body;

  try {
    // Checking user_id format for correctness
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid user_id format' });
    }

    const userObjectId = new mongoose.Types.ObjectId(user_id);

    // Creating a new car
    const vehicle = new Vehicle({
      user_id: userObjectId,
      make,
      model,
      year,
      vin_number,
    });

    await vehicle.save();

    res.status(201).json({ message: 'Vehicle added successfully' });
  } catch (error) {
    console.error('Error adding vehicle:', error.message);
    res.status(400).json({ message: 'Error adding vehicle', error: error.message });
  }
};

// Delete vehicle by ID
exports.deleteVehicle = async (req, res) => {
  const { vehicle_id } = req.params;

  try {
    const vehicle = await Vehicle.findByIdAndDelete(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};
