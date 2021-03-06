const teachersService = require('../services/teachersService');

const teachersController = {};

/**
 * Get all teachers
 * GET - /teachers
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of teachers
 */
teachersController.getTeachers = (req, res) => {
  const teachers = teachersService.getTeachers();
  res.status(200).json({
    teachers,
  });
};

/**
 * Get teacher by teacher id
 * GET - /teachers/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and user with specified id
 * Error: status 400 - Bad Request and error message
 */
teachersController.getTeacherById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacher = teachersService.getTeacherById(id);
  if (teacher) {
    res.status(200).json({
      teacher,
    });
  } else {
    res.status(400).json({
      error: `No teacher found with id: ${id}`,
    });
  }
};

/**
 * Create new teacher
 * POST - /teachers
 * Required values: firstName, lastName
 * Optional values: none
 * Success: status 201 - Created and id of created user
 * Error: status 400 - Bad Request and error message
 */
teachersController.createTeacher = (req, res) => {
  const { firstName, lastName } = req.body;
  if (firstName && lastName) {
    const teacher = {
      firstName,
      lastName,
    };
    const id = teachersService.createTeacher(teacher);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Firstname or lastname is missing',
    });
  }
};

/**
 * Delete teacher
 * DELETE - /teachers/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
teachersController.deleteTeacher = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if teacher exists
  const teacher = teachersService.getTeacherById(id);
  if (teacher) {
    const success = TeachersService.deleteTeacher(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting teacher',
      });
    }
  } else {
    res.status(400).json({
      error: `No teacher found with id: ${id}`,
    });
  }
};

/**
 * Update teacher
 * PATCH - /teachers/:id
 * Required values: id, firstName OR lastName
 * Optional values: firstName, lastName
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
teachersController.updateTeacher = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstName, lastName } = req.body;
  if (id && (firstName || lastName)) {
    const teacher = teachersService.getTeacherById(id);
    if (teacher) {
      const teacherToUpdate = {
        id,
        firstName,
        lastName,
      };
      const success = teachersService.updateTeacher(teacherToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating teacher',
        });
      }
    } else {
      res.status(400).json({
        error: `No teacher found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id, firstName or lastName is missing',
    });
  }
};

module.exports = teachersController;
