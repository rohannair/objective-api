'use strict';
import { Model } from 'objection';

import BaseModel from './Base';
import Company from './Company';
import Objective from './Objective';

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

      objectives: {
        relation: Model.ManyToManyRelation,
        modelClass: Objective,
        join: {
          from: 'users.id',
          through: {
            from: 'objectives_users.user_id',
            to: 'objectives_users.objective_id'
          },
          to: 'objectives.id'
        }
      }
    }

  }
}

export default User;
