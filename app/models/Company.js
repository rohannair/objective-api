const { Model } = require('objection');

class Company extends Model {
  static get tableName() {
    return 'companies';
  }
}

module.exports = Company;
