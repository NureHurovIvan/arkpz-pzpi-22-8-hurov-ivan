const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const swaggerDocs = require('./config/swagger');
const bodyParser = require('body-parser');
const iotRoutes = require('./routes/iotRoutes');
const mqtt = require('mqtt');
const Vehicle = require('./models/vehicle');

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

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.error('Subscription error:', err);
    }
  });
});

const { checkAndCreateMaintenance } = require('./utils/maintenanceUtils');

client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    console.log(`Retrieved data from topic ${topic}:`, payload);

    if (!payload.vin) {
      console.error('Error: VIN is missing from payload');
      return;
    }

    const vehicle = await Vehicle.findOne({ vin_number: payload.vin });
    if (!vehicle) {
      console.error(`Error: No vehicle found with VIN ${payload.vin}`);
      return;
    }

    vehicle.tirePressure = payload.tirePressure;
    vehicle.batteryVoltage = payload.batteryVoltage;
    vehicle.brakePadThickness = payload.brakePadThickness;
    await vehicle.save();

    console.log(`Vehicle data updated successfully for VIN ${payload.vin}`);
  } catch (error) {
    console.error('Error processing MQTT data:', error);
  }
});

// Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));