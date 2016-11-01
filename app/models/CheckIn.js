'use strict';
import BaseModel from './Base';

class CheckIn extends BaseModel {
  static tableName = 'check_ins';

  $beforeUpdate() {
    this.updated_at = new Date().toUTCString();
  }
}

export default CheckIn;
