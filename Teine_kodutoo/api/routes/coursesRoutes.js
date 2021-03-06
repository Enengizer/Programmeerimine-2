const express = require('express');
const coursesController = require('../controllers/coursesController');

const router = express.Router();

/**
 * Courses API endpoints
 */
router.get('/', coursesController.getCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.createCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
