const { Model } = require('objection');
const Company = require('./Company');

class User extends Model {
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
