let Emitter = require('events').EventEmitter;
let util = require('util');

let ReviewProcess = function (args) {
  let callback;
  let pre = '>\tReviewProcess:';
  this.out = (message) => {
    console.log(pre + message);
  }
  this.ensureAppValid = (app) => {
    this.out('ensureAppValid');
    if (app.isValid()) {
      this.emit('validated', app);
    } else {
      this.emit('invalid', app.getValidationMessage());
    }
  };
  this.findNextMission = (app) => {
    this.out('findNextMission');
    app.mission = {
      commander: null,
      pilot: null,
      MavPilot: null,
      passengers: []
    };
    this.emit('mission-selected', app);
  };
  this.roleIsAvailable = (app) => {
    this.out('roleIsAvailable');
    this.emit('role-available', app);
  };
  this.ensureRoleCompatible = (app) => {
    this.out('ensureRoleCompatible');
    this.emit('role-compatible', app);
  };
  this.acceptApplication = (app) => {
    this.out('acceptApplication');
    callback(null, {
      success: true,
      message: 'Welcome to the Mars Program'
    });
  };
  this.denyApplication = (message) => {
    this.out('denyApplication');
    callback(null, {
      success: false,
      message: message
    })
  };
  this.processApplication = (app, next) => {
    callback = next;
    this.out('processApplication');
    this.emit('application-received', app);
  };

  this.on('application-received', this.ensureAppValid);
  this.on('validated', this.findNextMission);
  this.on('mission-selected', this.roleIsAvailable);
  this.on('role-available', this.ensureRoleCompatible);
  this.on('role-compatible', this.acceptApplication);

  this.on('invalid', this.denyApplication);
}

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;
