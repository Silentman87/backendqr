const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('../db');
const serverless  = require('serverless-http');
require('dotenv').config();

const userRouter = require('../UserRoute');
const User = require('../Model/User');

const app = express();

app.use(cors({
     origin: '*',
}));

app.use(bodyparser.json());

app.use('/testuser', userRouter);

app.get('/hello', (req, res) => {
  res.json({ message: "Hello from Vercel!" });
});

module.exports = serverless(app);  // default export the handler
