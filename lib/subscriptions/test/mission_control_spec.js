const moment = require('moment');
const assert = require('assert');

const db = require('../db');
const sinon = require('sinon');

sinon.stub(db, 'find').yields(null, { id: 1 });
const MissionControl = require('../models/mission_control');
const missionControl = new MissionControl({ db: db });

describe('Mission Control', () => {
  describe('The Current Mission', () => {
    let currentMission;
    before((done) => {
      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      })
    });
    it('is created if none exists', () => {
      assert(currentMission);
    });
  });
});
