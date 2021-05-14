/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai')
const { coursesService } = require ('../api/services') 

let courses;

let existingCourse = {
    id: 1,
    nameofcourse: 'Riistvara',
};

describe('Courses service', function () {
  describe('GetCourses', function () {
    it('should return array of courses', async function () {
      courses = await coursesService.getcourses();
      expect(courses).to.be.a('array');
    });
    it('should contain at least 1 course', async function () {
        expect(courses.length).to.be.gt(1);
      });
  });
  describe('GetCourse by ID', function () {
    it('should return course object with keys', async function () {
      const course = await coursesService.getcourseById(existingCourse.id);
      expect(course).to.be.a('object');
      expect(course).to.have.keys(['id', 'nameofcourse', 'createdById', 'dayId', 'email', 'firstName', 'lastName']);
    });
  });
});