const express = require('express');
const {
  daysRoutes,
  roomsRoutes,
  coursesRoutes,
  usersRoutes,
} = require('./api/routes');
const { logger } = require('./api/middlewares');

const app = express();

// Middleware for creating req.body in express app
app.use(express.json());
// Logger middleware
app.use(logger);
// Routes
app.use('/rooms', roomsRoutes);
app.use('/users', usersRoutes);
app.use('/days', daysRoutes);
app.use('/courses', coursesRoutes);

module.exports = app;
