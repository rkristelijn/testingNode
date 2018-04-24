const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');
const sinon = require('sinon');

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision;
    validApp = new MembershipApplication({
      first: 'Robert',
      last: 'Bigelow',
      email: 'robert.bigelow@bigelowaerospace.com',
      age: 30,
      height: 66,
      weight: 180
    });
    let review = new ReviewProcess();
    let spy = sinon.spy(validApp, 'emailValid');
    before(function (done) {
      review.processApplication(validApp, function (err, result) {
        console.log('+\tspec:executing callback');
        decision = result;
        done();
      });
    });
    it('returns success', () => {
      assert(decision.success, decision.message);
    });
  })
});
