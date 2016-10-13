const { Model } = require('objection');
const { addId } = require('../utils');

const BaseModel = require('./Base');
const Mission = require('./Mission');
const User = require('./User');

class CheckIn extends BaseModel {
  static get tableName() {
    return 'check_ins';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toUTCString();
  }
}

module.exports = {
  CheckIn
};
