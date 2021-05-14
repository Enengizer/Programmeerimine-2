/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai')
const { daysService } = require ('../api/services') 

let days;

let existingDay = {
    id: 1,
    nameofday: 'Esmaspäev',
};

describe('Days service', function () {
  describe('GetDays', function () {
    it('should return array of days', async function () {
      days = await daysService.getdays();
      expect(days).to.be.a('array');
    });
    it('should contain at least 1 day', async function () {
        expect(days.length).to.be.gt(1);
      });
  });
  describe('GetDay by ID', function () {
    it('should return day object with keys', async function () {
      const day = await daysService.getdayById(existingDay.id);
      expect(day).to.be.a('object');
      expect(day).to.have.keys(['id','nameofday']);
    });
  });
});