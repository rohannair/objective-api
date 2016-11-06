'use strict';
import { Model } from 'objection';
import BaseModel from './Base';

import CheckIn from './CheckIn';

class Key_Result extends BaseModel {
  static tableName = 'key_results';

  static get relationMappings() {
    return {
      checkIns: {
        relation: Model.HasManyRelation,
        modelClass: CheckIn,
        join: {
          from: 'check_ins.key_result_id',
          to: 'key_results.id'
        }
      },
    }
  }
}

export default Key_Result;
