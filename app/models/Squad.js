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
      }
    }
  }
}

export default Squad;
