const assert = require('assert');
const MembershipApplication = require('../models/membership_application');

describe('Applying for mission', () => {
  let validApp;

  before(() => {
    validApp = new MembershipApplication({
      first: 'Robert',
      last: 'Bigelow',
      email: 'robert.bigelow@bigelowaerospace.com',
      age: 30,
      height: 66,
      weight: 180
    });
  });
  describe('Using valid email, first, last, height, age, weight', () => {
    it('is valid', () => {
      assert(validApp.isValid(), 'Not valid');
    });
    it('reports a valid email');
    it('reports a valid height');
    it('reports a valid age');
    it('reports a valid height');
    it('reports a valid last name');
    it('reports a valid first name');
  });
});
