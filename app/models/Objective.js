const { Model } = require('objection');
const BaseModel = require('./Base');

class Objective extends BaseModel {
  static get tableName() {
    return 'objectives';
  }
}

module.exports = Objective;
