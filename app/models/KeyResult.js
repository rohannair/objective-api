'use strict';
import { Model } from 'objection';
import BaseModel from './Base';

import CheckIn from './CheckIn';

class Key_Result extends BaseModel {
  static tableName = 'key_results';
}

export default Key_Result;
