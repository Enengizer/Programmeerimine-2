const { coursesService } = require('../services');
const { daysService } = require('../services');

const coursesController = {};
/**
 * courses
 */

/**
 * Get all courses
 * GET - /courses
 * Required values: none
 * Optional values: parameter dayId=:id - returns courses with day specified by dayId
 * Success: status 200 - OK and list of courses
 */
coursesController.getcourses = async (req, res) => {
  const dayId = parseInt(req.query.dayId, 10);
  // If day id is provided, search for courses in day
  if (!dayId) {
    // If no day id provided, search for all courses
    const courses = await coursesService.getcourses();
    return res.status(200).json({
      courses,
    });
  }
  const day = await daysService.getdayById(dayId);
  if (!day) {
    return res.status(400).json({
      error: `No day found with id: ${dayId}`,
    });
  }
  // If course exists
  const courses = await coursesService.getcoursesInday(dayId);
  if (!courses) {
    return res.status(400).json({
      error: `No course found with dayId: ${dayId}`,
    });
  }
  return res.status(200).json({
    courses,
  });
};

/**
 * Get course by specified id
 * GET - /courses/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and course with specified id
 * Error: status 400 - Bad Request and error message
 */
coursesController.getcourseById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await coursesService.getcourseById(id);
  if (!course) {
    return res.status(400).json({
      error: 'No course found',
    });
  }
  return res.status(200).json({
    course,
  });
};

/**
 * Create new course
 * POST - /courses
 * Required values: nameofcourse, dayId, roomId
 * Optional values: none
 * Success: status 201 - Created and id of created course
 * Error: status 400 - Bad Request and error message
 */
coursesController.createcourse = async (req, res) => {
  const { nameofcourse, dayId, roomId } = req.body;
  const createdById = req.userId;
  if (!nameofcourse || !dayId || !roomId) {
    return res.status(400).json({
      error: 'nameofcourse or dayId is missing',
    });
  }
  const course = {
    nameofcourse,
    dayId,
    roomId,
    createdById,
  };
  const id = await coursesService.createcourse(course);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while updating course',
    });
  }
  return res.status(201).json({
    id,
  });
};

/**
 * Delete course
 * DELETE - /courses/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No classroom
 * Error: status 400 - Bad Request and error message
 */
coursesController.deletecourse = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  const course = await coursesService.getcourseById(id);
  if (!course) {
    return res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
  if (!(course.createdById === createdById || isAdmin)) {
    return res.status(403).json({
      error: 'You have no rights to delete this course',
    });
  }
  const success = await coursesService.deletecourse(id);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while deleting course',
    });
  }
  return res.status(204).end();
};

/**
 * Update course
 * PATCH - /courses/:id
 * Required values: id, nameofcourse OR dayId OR roomId
 * Optional values: nameofcourse OR dayId OR roomId
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
coursesController.updatecourse = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nameofcourse, dayId, roomId } = req.body;
  const createdById = req.userId;
  const isAdmin = req.userRole === 'Admin';
  // Check if course exists
  const course = await coursesService.getcourseById(id);
  if (!course) {
    res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
  if (!(course.createdById === createdById || isAdmin)) {
    return res.status(403).json({
      error: 'You have no rights to update this course',
    });
  }
  if (!(nameofcourse || dayId|| roomId)) {
    return res.status(400).json({
      error: 'No required data provided',
    });
  }
  const courseToUpdate = {
    id,
    nameofcourse,
    dayId,
    roomId,
  };
  const success = await coursesService.updatecourse(courseToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating course',
    });
  }
  return res.status(200).json({
    success,
  });
};

module.exports = coursesController;
