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
  describe('Application valid if...', () => {
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
    it('first name is provided', () => {
      assert(validApp.firstNameValid());
    });
  });
  describe('Application invalid if...', () => {
    it('email is 4 character or less', () => {
      let app = new MembershipApplication({ email: 'd@d' });
      assert(!app.emailValid());
    });
    it('email has a @ character', () => {
      let app = new MembershipApplication({ email: 'robert.bigalow:bigelowaerospace.com' });
      assert(!app.emailValid());
    });
    it('email is omitted', () => {
      let app = new MembershipApplication({});
      assert(!app.emailValid());
    });
    it('height less than 60 inches', () => {
      let app = new MembershipApplication({ height: 60 });
      assert(!app.heightValid());
      app = new MembershipApplication({ height: 30 });
      assert(!app.emailValid());
    });
    it('height more than 75 inches', () => {
      let app = new MembershipApplication({ height: 75 });
      assert(!app.heightValid());
      app = new MembershipApplication({ height: 100 });
      assert(!app.heightValid());
    });
    it('height is omitted', () => {
      let app = new MembershipApplication({});
      assert(!app.heightValid());
    });
    it('age is less then 15', () => {
      let app = new MembershipApplication({ age: 15 });
      assert(!app.ageValid());
      app = new MembershipApplication({ age: 10 });
      assert(!app.ageValid());
    });
    it('age is more then 100', () => {
      let app = new MembershipApplication({ age: 100 });
      assert(!app.ageValid());
      app = new MembershipApplication({ age: 105 });
      assert(!app.ageValid());
    });
    it('age is omitted', () => {
      let app = new MembershipApplication({});
      assert(!app.ageValid());
    });
    it('weight less than 100', () => {
      let app = new MembershipApplication({ weight: 100 });
      assert(!app.weightValid());
      app = new MembershipApplication({ weight: 50 });
      assert(!app.weightValid());
    });
    it('weight more than 300', () => {
      let app = new MembershipApplication({ weight: 300 });
      assert(!app.weightValid());
      app = new MembershipApplication({ weight: 500 });
      assert(!app.weightValid());
    });
    it('weight is omitted', () => {
      let app = new MembershipApplication({});
      assert(!app.weightValid());
    });
    it('last is omitted', () => {
      let app = new MembershipApplication({});
      assert(!app.lastNameValid());
    });
    it('first is omitted', () => {
      let app = new MembershipApplication({});
      assert(!app.firstNameValid());
    });
  });
});
