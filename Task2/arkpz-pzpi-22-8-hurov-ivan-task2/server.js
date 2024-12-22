const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const swaggerDocs = require('./config/swagger');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

// Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
