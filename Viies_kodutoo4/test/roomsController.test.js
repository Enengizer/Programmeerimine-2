  
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

const newroom = {
  classroom: 'Javascript',
  dayId: 1,
  roomId: 1,
};

let newRoomId;
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

describe('Courses controller', function () {
  describe('GET /rooms', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/rooms');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
  });
  describe('POST /rooms', function () {
    it('responds with error message in json and statusCode 400 because of missing data', async function () {
      const response = await request(app).post('/rooms').set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.error).to.equal('classroom is missing');
    });
    it('responds with id of created course', async function () {
      const response = await request(app).post('/rooms').set('Authorization', `Bearer ${adminToken}`).send(newroom);
      newRoomId = response.body.id;
      expect(response.body).to.be.a('object');
      console.log(response.body);
      console.log("console log");
      expect(response.statusCode).to.equal(201);
      expect(response.body.id).to.be.a('number');
    });
    it('responds with error', async function () {
      const response = await request(app).post('/rooms').send(adminUser).set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
    });
  });

  describe('DELETE /rooms', function () {
    it('responds with id of created course', async function () {
      const response = await request(app).delete(`/rooms/${newRoomId}`).set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).to.equal(204);
    });
  });
});