'use strict';
import { Model } from 'objection';
import BaseModel from './Base';

import Squad from './Squad';
import Key_Result from './KeyResult';
import User from './User';

class Objective extends BaseModel {
  static tableName = 'objectives';

  $beforeUpdate() {
    this.updated_at = new Date().toUTCString();
  }

  static get relationMappings() {
    return {
      key_results: {
        relation: Model.HasManyRelation,
        modelClass: Key_Result,
        join: {
          from: 'objectives.id',
          to: 'key_results.objective_id'
        }
      },

      squad: {
        relation: Model.BelongsToOneRelation,
        modelClass: Squad,
        join: {
          from: 'objectives.squad_id',
          to: 'squads.id'
        }
      },

      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'objectives.id',
          through: {
            from: `objectives_users.objective_id`,
            to: `objectives_users.user_id`
          },
          to: `users.id`
        }
      }
    }
  }
}

export default Objective;
