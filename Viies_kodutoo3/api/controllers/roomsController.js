const { roomsService } = require('../services');

const roomsController = {};

/**
 * Get all rooms
 * GET - /rooms
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of rooms
 */
roomsController.getrooms = async (req, res) => {
  const rooms = await roomsService.getrooms();
  res.status(200).json({
    rooms,
  });
};

/**
 * Get room by specified id
 * GET - /rooms/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and room with specified id
 * Error: status 400 - Bad Request and error message
 */
roomsController.getroomById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const room = await roomsService.getroomById(id);
  if (room) {
    res.status(200).json({
      room,
    });
  } else {
    res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
};














/**
 * Create new room
 * POST - /rooms
 * Required values: classroom
 * Optional values: none
 * Success: status 201 - Created and id of created room
 * Error: status 400 - Bad Request and error message
 */
roomsController.createroom = async (req, res) => {
  const { classroom } = req.body;
  const createdById = req.userId;
  if (!classroom) {
    return res.status(400).json({
      error: 'classroom is missing',
    });
  }
  const room = {
    classroom,
    createdById,
  };
  const id = await roomsService.createroom(room);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating room',
    });
  }
  return res.status(201).json({
    id,
  });
};

/**
 * Delete room
 * DELETE - /rooms/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
roomsController.deleteroom = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if room exists
  const room = await roomsService.getroomById(id);
  if (!room) {
    return res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
  const success = await roomsService.deleteroom(id);
  if (!success) {
    res.status(500).json({
      error: 'Something went wrong while deleting room',
    });
  }
  return res.status(204).end();
};

/**
 * Update room
 * PATCH - /rooms/:id
 * Required values: id, classroom
 * Optional values: none
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
roomsController.updateroom = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { classroom } = req.body;
  if (!classroom) {
    return res.status(400).json({
      error: 'No classroom provided',
    });
  }
  const room = await roomsService.getroomById(id);
  if (!room) {
    return res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
  const roomToUpdate = {
    id,
    classroom,
  };
  const success = await roomsService.updateroom(roomToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating room',
    });
  }
  return res.status(200).json({
    success: true,
  });
};

module.exports = roomsController;


module.exports = roomsController;
