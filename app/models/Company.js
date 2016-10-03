const { Model } = require('objection');
const BaseModel = require('./Base');

class Company extends BaseModel {
  static get tableName() {
    return 'companies';
  }
}

module.exports = Company;
