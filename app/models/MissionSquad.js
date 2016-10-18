const { Model } = require('objection');
const BaseModel = require('./Base');

class Mission_Squad extends BaseModel {
  static get tableName() {
    return 'missions_squads';
  }
}

module.exports = Mission_Squad;
