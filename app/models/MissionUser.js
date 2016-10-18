const { Model } = require('objection');
const BaseModel = require('./Base');

class Mission_User extends BaseModel {
  static get tableName() {
    return 'missions_users';
  }
}

module.exports = Mission_User;
