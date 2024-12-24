const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const swaggerDocs = require('./config/swagger');
const bodyParser = require('body-parser');
const iotRoutes = require('./routes/iotRoutes');
const mqtt = require('mqtt'); // Подключаем MQTT

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

// MQTT настройка
const client = mqtt.connect('mqtt://broker.hivemq.com'); // Используйте свой брокер, если нужно
const topic = 'autocare/iot';

client.on('connect', () => {
  console.log('Подключено к MQTT брокеру');
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Подписка на тему: ${topic}`);
    } else {
      console.log('Ошибка подписки на тему: ' + err);
    }
  });
});

client.on('message', (topic, message) => {
  const payload = message.toString();
  console.log(`Получены данные с темы ${topic}: ${payload}`);
  // Здесь можно обработать полученные данные, например, сохранить в базу данных
});

// Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));