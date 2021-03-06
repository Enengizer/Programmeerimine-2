const database = require('../../database');

const coursesService = {};

// Returns all courses
coursesService.getCourses = () => {
  const { courses } = database;
  return courses;
};

// Find course by id. Returns course if found or false.
coursesService.getCourseById = (id) => {
  const course = database.courses.find((element) => element.id === id);
  if (course) {
    return course;
  }
  return false;
};

// Creates new course
coursesService.createCourse = (newCourse) => {
  const id = database.courses.length + 1;
  const course = {
    id,
    ...newCourse,
  };
  database.courses.push(course);
  return id;
};

// Deletes course
coursesService.deleteCourse = (id) => {
  // Find course index
  const index = database.courses.findIndex((element) => element.id === id);
  // Remove coourse from 'database'
  database.courses.splice(index, 1);
  return true;
};

module.exports = coursesService;
