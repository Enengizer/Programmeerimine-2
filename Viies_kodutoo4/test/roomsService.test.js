/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai')
const { roomsService } = require ('../api/services') 

let users;

let existingRoom = {
    id: 1,
    firstName: 'Martti',
    lastName: 'Raavel',
    email: 'mrt@mrt.ee',
};

describe('1 service', function () {
  describe('GetRooms', function () {
    it('should return array of rooms', async function () {
      rooms = await roomsService.getrooms();
      expect(rooms).to.be.a('array');
    });
    it('should contain at least 1 room', async function () {
        expect(rooms.length).to.be.gt(1);
      });
  });
  describe('GetRoom by ID', function () {
    it('should return room object with keys', async function () {
      const room = await roomsService.getroomById(existingRoom.id);
      expect(room).to.be.a('object');
      expect(room).to.have.keys(['id', 'classroom']);
    });
  });
});