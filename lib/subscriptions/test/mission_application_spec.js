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
  describe('Validations', () => {
    it('application is valid if all validators return true', () => {
      assert(validApp.isValid(), 'Not valid');
    });
    it('email is 4 or more chars and contains an @', () => {
      assert(validApp.emailValid());
    });
    it('reports a valid height', () => {
      assert(validApp.heightValid());
    });
    it('reports a valid age', () => {
      assert(validApp.ageValid());
    });
    it('reports a valid height', () => {
      assert(validApp.heightValid());
    });
    it('reports a valid last name', () => {
      assert(validApp.lastNameValid());
    });
    it('reports a valid first name', () => {
      assert(validApp.firstNameValid());
    });
  });
});
