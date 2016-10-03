const { Model } = require('objection');
const BaseModel = require('./Base');

class Mission_Objective extends BaseModel {
  static get tableName() {
    return 'missions_objectives';
  }
}

module.exports = Mission_Objective;
