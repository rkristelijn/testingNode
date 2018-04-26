const assert = require('assert');
const moment = require('moment');

let Mission = function (args) {
  args = args || {};
  this.nextMonthTheFirst = () => {
    return (moment().add(1, 'month').startOf('month')).format('MM-DD-YYYY');
  }
  let mission = {
    status: 'open', // open, closed, canceled
    commander: args.Commander || null,
    mavPilot: args.mavPilot || null,
    colonists: args.colonists || [],
    tourists: args.tourists || [],
    launchDate: args.launchDate || this.nextMonthTheFirst()
  }

  mission.needsRole = (role) => {
    let needed = false;
    if (!this.isFlying()) { return false; }
    switch (role) {
      case 'mission-commander': needed = !this.commander; break;
      case 'mav-pilot': needed = !this.mavPilot; break;
      case 'colonists': needed = this.colonists.length <= 10;
      case 'space-tourist': needed = this.tourists.length <= 20;
    }
    return needed;
  };
  mission.assignRole = (args) => {
    assert.ok(args.user && args.role, 'Need a user and rol in order to assign');
    let role = args.role;
    let user = args.user;
    switch(role) {
      case 'mission-commander': this.commander = user; break;
      case 'mav-pilot': this.mavPilot = user; break;
      case 'colonist': this.colonists.push(user); break;
      case 'space-tourist': this.tourists.push(user); break;
    }
    return this;
  };
  mission.isFlying = () => {
    return this.status === 'open';
  };
  return mission;
};

module.exports = Mission;
