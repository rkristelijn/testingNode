const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision;
    before(function (done) {
      validApp = new MembershipApplication({
        first: 'Robert',
        last: 'Bigelow',
        email: 'robert.bigelow@bigelowaerospace.com',
        age: 30,
        height: 66,
        weight: 180
      });
      let review = new ReviewProcess();
      review.processApplication(validApp, function (err, result) {
        console.log('executing callback');
        decision = result;
        done();
      });
    });
    it('returns success', () => {
      assert(decision.success, decision.message);
    });
  })
});
