const { Model } = require('objection');
const BaseModel = require('./Base');

class Target extends BaseModel {
  static get tableName() {
    return 'targets';
  }
}

module.exports = Target;
