const { Model } = require('objection');
const BaseModel = require('./Base');

class Resource extends BaseModel {
  static get tableName() {
    return 'resources';
  }
}

module.exports = Resource;
