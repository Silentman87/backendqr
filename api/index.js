require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const connectDB = require('../db');
const serverless  = require('serverless-http');


const userRouter = require('../UserRoute');
const User = require('../Model/User');

const app = express();
app.use(bodyparser.json());
app.use(cors({
    origin:'https://ultimateqr.eacademyy.in'
}))
app.use('/testuser', userRouter);
module.exports = app
module.exports.handler = serverless(app)