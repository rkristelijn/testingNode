const moment = require('moment');
const assert = require('assert');

const MissionControl = require('../models/mission_control');
const missionControl = new MissionControl({ db: null });

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
