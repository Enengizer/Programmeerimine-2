const database = require('../../database');

const teachersService = {};

// Returns list of teachers
teachersService.getTeachers = () => {
  const { teachers } = database;
  return teachers;
};

// Find user by id. Returns teacher if found or false.
teachersService.getTeacherById = (id) => {
  const teacher = database.teachers.find((element) => element.id === id);
  if (teacher) {
    return teacher;
  }
  return false;
};

// Creates new teacher, returns id on new teacher
teachersService.createTeacher = (newTeacher) => {
  const id = database.teachers.length + 1;
  const teacher = {
    id,
    ...newTeacher,
  };
  database.teachers.push(teacher);
  return id;
};

// Deletes teacher
teachersService.deleteTeacher = (id) => {
  // Find teacher index
  const index = database.teachers.findIndex((element) => element.id === id);
  // Remove teacher from 'database'
  database.teachers.splice(index, 1);
  return true;
};

// Updates teacher
teachersService.updateTeacher = (teacher) => {
  const index = database.teachers.findIndex((element) => element.id === teacher.id);
  if (teacher.firstName) {
    database.teachers[index].firstName = teacher.firstName;
  }
  if (teacher.lastName) {
    database.teachers[index].lastName = teacher.lastName;
  }
  return true;
};

module.exports = teachersService;
