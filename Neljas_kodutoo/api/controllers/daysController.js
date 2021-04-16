const { daysService } = require('../services');

const daysController = {};

/**
 * Get all days
 * GET - /days
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of days
 */
daysController.getdays = async (req, res) => {
  const days = await daysService.getdays();
  res.status(200).json({
    days,
  });
};

/**
 * Get day by specified id
 * GET - /days/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and day with specified id
 * Error: status 400 - Bad Request and error message
 */
daysController.getdayById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const day = await daysService.getdayById(id);
  if (day) {
    res.status(200).json({
      day,
    });
  } else {
    res.status(400).json({
      error: `No day found with id: ${id}`,
    });
  }
};



module.exports = daysController;
