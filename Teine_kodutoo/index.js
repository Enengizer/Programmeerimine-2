const express = require('express');
const config = require('./config');
const database = require('./database');
const coursesRoutes = require('./api/routes/coursesRoutes');
const teachersRoutes = require('./api/routes/teachersRoutes');

const app = express();
const { port } = config || 3000;

const logger = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

// Middleware for creating req.body in express app
app.use(express.json());
// Routes
app.use('/courses', coursesRoutes);
app.use('/teachers', teachersRoutes);
// Logger middleware
app.use(logger);


/**
 * Rooms related functions
 */

// Find room by id. Returns room if found or false.
const findRoomById = (id) => {
  const room = database.rooms.find((element) => element.id === id);
  if (room) {
    return room;
  }
  return false;
};


/**
 * Days related functions
 */

// Find day by id. Returns day if found or false.
const findDayById = (id) => {
  const day = database.days.find((element) => element.id === id);
  if (day) {
    return day;
  }
  return false;
};






/**
 * Rooms API endpoints
 */

/**
 * Get all rooms
 * GET - /rooms
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of rooms
 */
app.get('/rooms', (req, res) => {
  res.status(200).json({
    rooms: database.rooms,
  });
});


/**
 * Get room by specified id
 * GET - /rooms/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and room with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/rooms/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const room = findRoomById(id);
  if (room) {
    res.status(200).json({
      room,
    });
  } else {
    res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
});

/**
 * Create new room
 * POST - /rooms
 * Required values: description
 * Optional values: none
 * Success: status 201 - Created and id of created room
 * Error: status 400 - Bad Request and error message
 */
app.post('/rooms', (req, res) => {
  const { description } = req.body;
  if (description) {
    const room = {
      id: database.rooms.length + 1,
      description,
    };
    database.rooms.push(room);
    res.status(201).json({
      id: room.id,
    });
  } else {
    res.status(400).json({
      error: 'Description is missing',
    });
  }
});

/**
 * Delete room
 * DELETE - /rooms/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
app.delete('/rooms/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if room exists
  const room = findRoomById(id);
  if (room) {
    // Find room index
    const index = database.rooms.findIndex((element) => element.id === id);
    // Remove room from 'database'
    database.rooms.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
});

/**
 * Update room
 * PATCH - /rooms/:id
 * Required values: id, description
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/rooms/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;
  if (id && description) {
    const room = findRoomById(id);
    if (room) {
      const index = database.rooms.findIndex((element) => element.id === id);
      database.rooms[index].description = description;
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(400).json({
        error: `No room found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'No description provided',
    });
  }
});

/**
 * Days API endpoints
 */

/**
 * Get all days
 * GET - /days
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of days
 */
app.get('/days', (req, res) => {
  res.status(200).json({
    days: database.days,
  });
});


/**
 * Get day by specified id
 * GET - /days/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and day with specified id
 * Error: status 400 - Bad Request and error message
 */
app.get('/days/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const day = findDayById(id);
  if (day) {
    res.status(200).json({
      day,
    });
  } else {
    res.status(400).json({
      error: `No day found with id: ${id}`,
    });
  }
});

/**
 * Create new day
 * POST - /days
 * Required values: description
 * Optional values: none
 * Success: status 201 - Created and id of created day
 * Error: status 400 - Bad Request and error message
 */
app.post('/days', (req, res) => {
  const { description } = req.body;
  if (description) {
    const day = {
      id: database.days.length + 1,
      description,
    };
    database.days.push(day);
    res.status(201).json({
      id: day.id,
    });
  } else {
    res.status(400).json({
      error: 'Description is missing',
    });
  }
});

/**
 * Delete day
 * DELETE - /day/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
app.delete('/days/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if day exists
  const day = findDayById(id);
  if (room) {
    // Find day index
    const index = database.days.findIndex((element) => element.id === id);
    // Remove day from 'database'
    database.days.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(400).json({
      error: `No day found with id: ${id}`,
    });
  }
});

/**
 * Update day
 * PATCH - /days/:id
 * Required values: id, description
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
app.patch('/days/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;
  if (id && description) {
    const day = findDayById(id);
    if (day) {
      const index = database.days.findIndex((element) => element.id === id);
      database.days[index].description = description;
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(400).json({
        error: `No day found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'No description provided',
    });
  }
});





// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
