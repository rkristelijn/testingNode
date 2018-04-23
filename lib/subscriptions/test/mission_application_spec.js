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
    it('all validators successful', () => {
      assert(validApp.isValid(), 'Not valid');
    });
    it('email is 4 or more chars and contains an @', () => {
      assert(validApp.emailValid());
    });
    it('height is between 60 and 75', () => {
      assert(validApp.heightValid());
    });
    it('age is between 15 and 100', () => {
      assert(validApp.ageValid());
    });
    it('weight is between 100 and 300', () => {
      assert(validApp.weightValid());
    });
    it('last name is provided', () => {
      assert(validApp.lastNameValid());
    });
    it('first name os provided', () => {
      assert(validApp.firstNameValid());
    });
  });
});
