
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const serverless = require('serverless-http');
require('../db');

const userRouter = require('../UserRoute');

const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors({
    origin: '*'
}));

// Routes
app.use('/testuser', userRouter);

module.exports = app
module.exports.handlers = serverless(app)
