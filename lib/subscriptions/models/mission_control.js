const assert = require('assert');
const moment = require('moment');
const Mission = require('./mission');
//const db = require('../db');

let MissionControl = function(args) {
  assert(args.db, 'Need a DB instance');
  this.db = args.db;
};

MissionControl.prototype.currentMission = function(next) {
  let nextMission = moment.add(1, 'month').startOf('month');
  let formattedMissionDate = nextMission.format('MM-DD-YYYY');
  let self = this;
  this.db.find({ launchDate: formattedMissionDate }, (err, foundMission) => {
    assert.ok(err === null, err);
    if (foundMission) {
      next(null, new Mission(foundMission));
    }
    else {
      foundMission = new Mission();
      self.db.insert(foundMission, (err, result) => {
        next(err, foundMission);
      });
    }
  });
};
MissionControl.prototype.hasSpaceForRole = (role, next) => {
  this.currentMission((err, mission) => {
    let hasRoom = mission.needsRole(role);
    next(null, hasRoom);
  });
};

module.exports = MissionControl;
