const { Model } = require('objection');

const BaseModel = require('./Base');
const Company = require('./Company');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'users.company_id',
          to: 'companies.id'
        }
      }
    }
  }
}

module.exports = User;
