const { Model } = require('objection');
const BaseModel = require('./Base');

class Squad_User extends BaseModel {
  static get tableName() {
    return 'squads_users';
  }
}

module.exports = Squad_User;
