const express = require('express');
const { daysController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

/**
 * days API endpoints
 */
router
  .use(isLoggedIn)
  .get('/', daysController.getdays)
  .get('/:id', daysController.getdayById)




module.exports = router;
