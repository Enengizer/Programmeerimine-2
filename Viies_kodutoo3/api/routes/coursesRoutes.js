const express = require('express');
const { coursesController } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

/**
 * days API endpoints
 */
router
  .use(isLoggedIn)
  .get('/', coursesController.getcourses)
  .get('/:id', coursesController.getcourseById)
  .post('/', coursesController.createcourse)
  .patch('/:id', coursesController.updatecourse)
  .delete('/:id', coursesController.deletecourse);

module.exports = router;
