const { Model } = require('objection');
const BaseModel = require('./Base');

class Mission_Resource extends BaseModel {
  static get tableName() {
    return 'missions_resources';
  }
}

module.exports = Mission_Resource;
