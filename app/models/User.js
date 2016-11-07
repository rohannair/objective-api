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
        relation: Model.HasManyRelation,
        modelClass: Objective,
        join: {
          from: 'users.id',
          to: 'objectives.user_id'
        }
      }
    }

  }
}

export default User;
