const mqtt = require('mqtt');

// Подключаемся к MQTT брокеру (можно использовать публичный брокер, например, hivemq)
const client = mqtt.connect('mqtt://broker.hivemq.com'); // Используйте свой брокер, если нужно

// Тема, на которую мы подписываемся
const topic = 'autocare/iot';

// Подключаемся к брокеру
client.on('connect', () => {
  console.log('Подключено к MQTT брокеру');
  
  // Подписываемся на тему
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Подписка на тему: ${topic}`);
    } else {
      console.log('Ошибка подписки на тему: ' + err);
    }
  });
});

// Обработка полученных сообщений
client.on('message', (topic, message) => {
  // Преобразуем сообщение из байтов в строку
  const payload = message.toString();
  
  // Выводим полученные данные в консоль
  console.log(`Получены данные с темы ${topic}: ${payload}`);
  
  // Здесь можно добавить логику для обработки полученных данных,
  // например, сохранять их в базу данных, отправлять на веб-интерфейс и т.д.
});
