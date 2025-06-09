
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const serverless = require('serverless-http');
require('./db');

const userRouter = require('./UserRoute');

const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors({
  origin: 'https://frontendqr-woov.onrender.com',
  credentials: true
}));

// Routes
app.use('/testuser', userRouter);

const PORT = process.env.PORT || 3000;;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


