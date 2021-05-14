const db = require('../../db');

const coursesService = {};

// Returns courses
coursesService.getcourses = async () => {
  const courses = await db.query(
    `SELECT
      E.id, E.nameofcourse, D.id AS dayId, D.nameofday , U.id AS createdById, U.firstName, U.lastName, U.email, U.id AS roomId, C.classroom
    FROM
      courses E
    INNER JOIN
      days D ON E.dayId = D.id
    INNER JOIN
      users U ON E.createdById = U.id
    INNER JOIN
      rooms C ON E.roomId = C.id
    WHERE
      E.deleted = 0`,
  );
  return courses;
};

// Returns courses in day specified by dayId
coursesService.getcoursesInday = async (dayId) => {
  const courses = await db.query(
    `SELECT
      E.id, E.nameofcourse, E.dayId, U.id AS createdById, U.firstName, U.lastName, U.email
    FROM
      courses E
    INNER JOIN
      users U ON E.createdById = U.id
    WHERE
      E.deleted = 0 AND dayId = ?`, [dayId],
  );
  return courses;
};

// Find course by id. Returns course if found or false.
coursesService.getcourseById = async (id) => {
  const course = await db.query(
    `SELECT
      E.id, E.nameofcourse, E.dayId, U.id AS createdById, U.firstName, U.lastName, U.email
    FROM
      courses E
    INNER JOIN
      users U ON E.createdById = U.id
    WHERE
      E.id = ? AND E.deleted = 0
      
      
      `, [id],
  );
  if (!course) {
    return false;
  }
  return course[0];
};

// Creates new course, returns id of created course
coursesService.createcourse = async (newcourse) => {
  const result = await db.query('INSERT INTO courses SET ?', [newcourse]);
  const id = result.insertId;
  return id;
};

// Deletes course specified by courseId
coursesService.deletecourse = async (id) => {
  await db.query('UPDATE courses SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates course, returns true if successful
coursesService.updatecourse = async (course) => {
  const courseToUpdate = {};
  if (course.nameofcourse) {
    courseToUpdate.nameofcourse = course.nameofcourse;
  }
  if (course.dayId) {
    courseToUpdate.dayId = course.dayId;
  }
  
  await db.query('UPDATE courses SET ? WHERE id = ?', [courseToUpdate, course.id]);
  return true;
};

module.exports = coursesService;
