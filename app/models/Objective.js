'use strict';
import { Model } from 'objection';
import BaseModel from './Base';

import Squad from './Squad';
import Key_Result from './KeyResult';

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
      }
    }
  }
}

export default Objective;
