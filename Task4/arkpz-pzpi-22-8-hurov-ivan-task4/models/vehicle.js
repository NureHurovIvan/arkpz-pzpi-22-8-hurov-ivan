// models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin_number: { type: String, required: true },
  tirePressure: { type: Number, default: null }, // Давление в шинах
  batteryVoltage: { type: Number, default: null }, // Напряжение аккумулятора
  brakePadThickness: { type: Number, default: null } // Толщина тормозных колодок
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
