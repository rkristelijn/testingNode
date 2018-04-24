const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');
const sinon = require('sinon');

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision;
    let pre = '\tspec:';
      validApp = new MembershipApplication({
        first: 'Robert',
        last: 'Bigelow',
        email: 'robert.bigelow@bigelowaerospace.com',
        age: 30,
        height: 66,
        weight: 180
      });
    let review = new ReviewProcess();
    let spy = sinon.spy();
    before(function (done) {
      review.on("validated", spy);
      review.on("mission-selected", spy);
      review.on("role-available", spy);
      review.on("role-compatible", spy);
      review.processApplication(validApp, function (err, result) {
        console.log(pre + 'executing callback');
        decision = result;
        done();
      });
    });
    it('returns success', () => {
      assert(decision.success, decision.message);
    });
    it('ensures the application is valid', () => {
      console.log(pre + 'spy.callCount:', spy.callCount);
      assert.equal(spy.callCount, 4);
    });
  })
});
