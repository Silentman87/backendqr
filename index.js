
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
require('./db');

const userRouter = require('./UserRoute');

const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors({
    origin: '*'
}));

// Routes
app.use('/testuser', userRouter);

// Connect to DB and then start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server is running at http://localhost:${PORT}`);
});

