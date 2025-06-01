const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('../db');
const serverless  = require('serverless-http');
require('dotenv').config();

const userRouter = require('../UserRoute');

const User = require('../Model/User');
 // if it's in models/User.js


const app = express();


app.use(cors({
     origin: '*', // correct origin
}));
 // handle preflight requests

app.use(bodyparser.json());


app.use('/testuser', userRouter);





module.exports =  index;
module.exports.handler = serverless(index)

