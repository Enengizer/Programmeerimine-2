const coursesService = require('../services/coursesService');

const coursesController = {};

/**
 * Get all courses
 * GET - /courses
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of courses
 */
coursesController.getCourses = (req, res) => {
  const courses = coursesService.getCourses();
  res.status(200).json({
    courses,
  });
};

/**
 * Get course by course id
 * GET - /courses/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and course with specified id
 * Error: status 400 - Bad Request and error message
 */
coursesController.getCourseById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = coursesService.getCourseById(id);
  if (course) {
    res.status(200).json({
      course,
    });
  } else {
    res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
};

/**
 * Create new course
 * POST - /courses
 * Required values: teacherById, name
 * Optional values: none
 * Success: status 201 - Created and id of created comment
 * Error: status 400 - Bad Request and error message
 */
coursesController.createCourse = (req, res) => {
  const { teacherById, name } = req.body;
  if ( teacherById && name) {
    const course = {
      teacherById,
      name,
    };
    const id = coursesService.createCourse(course);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Teacher id / name on content is missing',
    });
  }
};

/**
 * Delete course
 * DELETE - /courses/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
coursesController.deleteCourse = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if course exists
  const course = coursesService.getCourseById(id);
  if (course) {
    const success = coursesService.deleteCourse(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting course.',
      });
    }
  } else {
    res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
};

module.exports = coursesController;
