const _ = require('underscore')._;
const moment = require('moment');

function MembershipApplication(args) {
  args || (args = {});
  _.extend(this, args);
  this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');
  this.expired = () => {
    return this.validUntil.isBefore(moment());
  };
  this.emailValid = () => {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };
  this.firstNameValid = () => {
    return !!this.last;
  };
  this.lastNameValid = () => {
    return !!this.first;
  };
  this.heightValid = () => {
    return this.height && this.height > 60 && this.height < 75;
  };
  this.ageValid = () => {
    return this.age && this.age < 100 && this.age > 15;
  };
  this.weightValid = () => {
    return this.weight && this.weight > 100 && this.weight < 300;
  };
  this.isValid = () => {
    return this.emailValid()
      && this.firstNameValid()
      && this.lastNameValid()
      && this.heightValid()
      && this.ageValid()
      && this.weightValid()
      && !this.expired()
  };
};

module.exports = MembershipApplication;
