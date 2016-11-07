'use strict';
import { Model } from 'objection';

import BaseModel from './Base';

import Company from './Company';
import Objective from './Objective';
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

      leader: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'squads.creator',
          to: 'users.id'
        }
      },

      objectives: {
        relation: Model.HasManyRelation,
        modelClass: Objective,
        join: {
          from: 'squads.id',
          to: 'objectives.squad_id'
        }
      },

      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'squads.id',
          through: {
            from: 'squads_users.squad_id',
            to: 'squads_users.user_id'
          },
          to: 'users.id'
        }
      }
    }
  }
}

export default Squad;
