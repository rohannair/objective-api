import { Model } from 'objection';

import BaseModel from './Base';

import Company from './Company';
import Mission from './Mission';
import User from './User';

class Squad extends BaseModel {
  static tableName = 'squads';

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
        modelClass: Mission,
        join: {
          from: 'squads.id',
          through: {
            from: 'missions_squads.squad_id',
            to: 'missions_squads.mission_id'
          },
          to: 'missions.id'
        }
      },

      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
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

export default Squad;