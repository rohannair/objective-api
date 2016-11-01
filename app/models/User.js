'use strict';
import { Model } from 'objection';

import BaseModel from './Base';
import Company from './Company';
import Mission from './Mission';
import Squad from './Squad';

class User extends BaseModel {
  static tableName = 'users';

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
      },

      missions: {
        relation: Model.ManyToManyRelation,
        modelClass: Mission,
        join: {
          from: 'users.id',
          through: {
            from: 'missions_users.user_id',
            to: 'missions_users.mission_id'
          },
          to: 'missions.id'
        }
      }
    }

  }
}

export default User;
