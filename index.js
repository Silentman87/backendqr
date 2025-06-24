
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const serverless = require('serverless-http');
require('./db');

const userRouter = require('./UserRoute');
 const dashboardRouter = require('./component/DashboardRoute');
const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://frontendqr-woov.onrender.com'
  ],
  credentials: true
}));
 
// for serverles fronend url https://frontendqr-woov.onrender.com 
// Routes
app.use('/testuser', userRouter);
app.use('/dashboard', dashboardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


