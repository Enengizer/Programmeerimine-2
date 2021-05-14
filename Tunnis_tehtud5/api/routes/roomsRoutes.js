const express = require('express');
const { roomsController } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/**
 * rooms API endpoints
 */
router
  .use(isLoggedIn)
  .get('/', roomsController.getrooms)
  .get('/:id', roomsController.getroomById)
  .post('/', roomsController.createroom)
  .delete('/:id', roomsController.deleteroom);

module.exports = router;
