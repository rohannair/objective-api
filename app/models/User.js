const { Model } = require('objection');

const BaseModel = require('./Base');
const Company = require('./Company');
const Squad = require('./Squad');

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
      },

      squads: {
        relation: Model.ManyToManyRelation,
        modelClass: Squad,
        join: {
          from: 'users.id',
          through: {
            from: 'squads_users.user_id',
            to: 'squads_users.squad_id'
          },
          to: 'squads.id'
        }
      }
    }

  }
}

module.exports = User;
