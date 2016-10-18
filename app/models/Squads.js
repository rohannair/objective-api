const { Model } = require('objection');

const BaseModel = require('./Base');
const Company = require('./Company');
const User = require('./User');
const MissionSquad = require('./MissionSquad');

class Squad extends BaseModel {
  static get tableName() {
    return 'squads';
  }

  static get relationMappings() {
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'squads.company_id',
          to: 'companies.id'
        }
      },

      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'squads.creator',
          to: 'users.id'
        }
      },

      missions: {
        relation: Model.ManyToManyRelation,
        modelClass: MissionSquad,
        join: {
          from: 'squads.id',
          through: {
            from: 'missions_squads.squad_id',
            to: 'missions_squads.mission_id'
          }
          to: 'missions.id'
        }
      },

      users: {
        relation: Model.ManyToManyRelation,
        modelClass: SquadUser,
        join: {
          from: 'squads.id',
          through: {
            from: 'squads_users.squad_id',
            to: 'squads_users.user_id',
          },
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Squad;
