const express = require('express');
const router = express.Router();
const { getAllUsers, registerUser, loginUser, deleteUser } = require('../controllers/userController');
const { addVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { addMaintenance } = require('../controllers/maintenanceController');

// User routes
router.get('/users', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/users/:user_id', deleteUser);

// Vehicles routes
router.post('/vehicles', addVehicle); 
router.delete('/vehicles/:vehicle_id', deleteVehicle);

// maintenance routes
router.post('/maintenance', addMaintenance); 

module.exports = router;
