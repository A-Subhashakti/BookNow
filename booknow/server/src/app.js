const express = require('express');
const cors = require('cors');
require('express-async-errors');

const app = express();
app.use(cors(), express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use(require('./middleware/error'));

module.exports = app;
