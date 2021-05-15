const db = require('../../db');

const daysService = {};

// Returns list of days
daysService.getdays = async () => {
  const days = await db.query(
    `SELECT
      C.id, C.nameofday
    FROM
      days C`,
  );
  return days;
};

// Find day by id. Returns day if found or false.
daysService.getdayById = async (id) => {
  const day = await db.query(
    `SELECT
      C.id, C.nameofday
    FROM
      days C

    WHERE
    C.id = ?`, [id],
  );
  if (!day) return false;
  return day[0];
};



module.exports = daysService;
