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
    let validationSpy = sinon.spy();
    let missionSpy = sinon.spy();
    let roleAvailableSpy = sinon.spy();
    let roleCompatibleSpy = sinon.spy();
    before(function (done) {
      review.on("validated", validationSpy);
      review.on("mission-selected", missionSpy);
      review.on("role-available", roleAvailableSpy);
      review.on("role-compatible", roleCompatibleSpy);
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
      console.log(pre + 'validationSpy.called:', validationSpy.called);
      assert(validationSpy.called);
    });
    it('selects a mission', () => {
      console.log(pre + 'missionSpy.called:', missionSpy.called);
      assert(missionSpy.called);
    });
    it('ensure role exists', () => {
      console.log(pre + 'roleAvailableSpy.called:', roleAvailableSpy.called);
      assert(roleAvailableSpy.called);
    });
    it('ensures role compatibility', () => {
      console.log(pre + 'roleCompatibleSpy.called:', roleCompatibleSpy.called);
      assert(roleCompatibleSpy.called);
    });
  })
});
