const db = require('../../db');

const roomsService = {};

// Returns list of rooms
roomsService.getrooms = async () => {
  const rooms = await db.query(
    `SELECT
      R.id, R.classroom
    FROM
      rooms R`,
  );
  return rooms;
};

// Find room by id. Returns room if found or false.
roomsService.getroomById = async (id) => {
  const room = await db.query(
    `SELECT
      R.id, R.classroom
    FROM
      rooms R

    WHERE
    R.id = ?`, [id],
  );
  if (!room) return false;
  return room[0];
};



module.exports = roomsService;
