let Emitter = require('events').EventEmitter;
let util = require('util');

let ReviewProcess = function (args) {
  var callback;
  this.ensureAppValid = (app) => {
    if (app.isValid()) {
      this.emit('validated', app);
    } else {
      this.emit('invalid', app.getValidationMessage());
    }
  };
  this.findNextMission = (app) => {
    app.mission = {
      commander: null,
      pilot: null,
      MavPilot: null,
      passengers: []
    };
    this.emit('mission-selected', app);
  };
  this.roleIsAvailable = (app) => {
    this.emit('role-available', app);
  };
  this.ensureRoleCompatible = (app) => {
    this.emit('role-compatible', app);
  };
  this.acceptApplication = (app) => {
    console.log('acceptApplication', callback);
    callback(null, {
      success: true,
      message: 'Welcome to the Mars Program'
    });
  };
  this.denyApplication = (message) => {
    console.log('denyApplication', callback);
    callback(null, {
      success: false,
      message: message
    })
  };
  this.processApplication = (app, next) => {
    callback = next;
    this.emit('application-received', app);
    console.log('processApplication', callback);
  };

  this.on('application-received', this.ensureAppValid);
  this.on('validated', this.findNextMission);
  this.on('mission-selected', this.roleIsAvailable);
  this.on('role-available', this.ensureRoleCompatible);
  this.on('role-compatible', this.acceptApplication);

  this.on('invalid', this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;
