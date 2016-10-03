const { Model } = require('objection');
const BaseModel = require('./Base');

class Mission_Target extends BaseModel {
  static get tableName() {
    return 'missions_users';
  }
}

module.exports = Mission_Target;
