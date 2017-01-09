'use strict'
import { Model } from 'objection'
import BaseModel from './Base'

import Snapshot from './Snapshot'
import Key_Result from './KeyResult'
import Resource from './Resource'
import Squad from './Squad'

class Objective extends BaseModel {
  static tableName = 'objectives';

  $beforeUpdate() {
    this.updated_at = new Date().toUTCString()
  }

  static get relationMappings() {
    return {
      snapshots: {
        relation: Model.HasManyRelation,
        modelClass: Snapshot,
        join: {
          from: 'objectives.id',
          to: 'snapshots.objective_id'
        }
      },

      key_results: {
        relation: Model.HasManyRelation,
        modelClass: Key_Result,
        join: {
          from: 'objectives.id',
          to: 'key_results.objective_id'
        }
      },

      resources: {
        relation: Model.HasManyRelation,
        modelClass: Resource,
        join: {
          from: 'objectives.id',
          to: 'resources.objective_id'
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
    }
  }
}

export default Objective
