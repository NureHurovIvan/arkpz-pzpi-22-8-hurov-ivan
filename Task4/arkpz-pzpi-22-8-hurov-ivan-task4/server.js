const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const swaggerDocs = require('./config/swagger');
const bodyParser = require('body-parser');
const iotRoutes = require('./routes/iotRoutes');
const mqtt = require('mqtt');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoutes);
app.use(bodyParser.json());
app.use('/api', iotRoutes); 

// Swagger
swaggerDocs(app);

// MQTT
const client = mqtt.connect('mqtt://broker.hivemq.com');
const topic = 'autocare/iot';

const { checkAndCreateMaintenance } = require('./utils/maintenanceUtils');

client.on('message', async (topic, message) => {
  const payload = JSON.parse(message.toString());
  console.log(`Retrieved data from topic ${topic}: ${JSON.stringify(payload)}`);

  const { vin, tirePressure, batteryVoltage, brakePadThickness } = payload;

  try {
    const vehicle = await Vehicle.findOne({ vin_number: vin });

    if (!vehicle) {
      console.log(`Vehicle with VIN ${vin} not found`);
      return;
    }

    vehicle.tirePressure = tirePressure;
    vehicle.batteryVoltage = batteryVoltage;
    vehicle.brakePadThickness = brakePadThickness;
    await vehicle.save();

    console.log(`Vehicle state updated for VIN ${vin}`);

    await checkAndCreateMaintenance(vehicle);
  } catch (error) {
    console.error('Error processing MQTT data:', error);
  }
});


// Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));