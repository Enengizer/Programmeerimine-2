  
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mrt@mrt.ee',
  password: 'mrt',
};



let newCourseId;

let adminToken;

describe('POST /users/login', function () {
    it('responds with token2', async function () {
      const response = await request(app).post('/users/login').send(adminUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.token).to.be.a('string');
      adminToken = response.body.token;
    });
  });

describe('Days controller', function () {
  describe('GET /days', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/days');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
  });

    it('responds with id of day', async function () {
      const response = await request(app).get('/days/1').set('Authorization', `Bearer ${adminToken}`);
      newCourseId = response.body.id;
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      console.log(response.body.id);
      console.log("console log555");
      expect(response.body.id).to.be.a('number');

    });


});