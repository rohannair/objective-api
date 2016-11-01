'use strict';
import { Model } from 'objection';

import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';

class BaseModel extends Model {
  static get Model() {
    return Model;
  }

  $beforeUpdate () {
    if (this.updated_at) this.updated_at = new Date().toISOString();
  }

  $beforeInsert () {
    if (this.created_at)  this.created_at = new Date().toISOString();
  }

  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json);

    return mapKeys(json, function (value, key) {
      return snakeCase(key);
    });
  }

  $parseDatabaseJson(json) {
    json = mapKeys(json, function (value, key) {
      return camelCase(key);
    });

    return super.$parseDatabaseJson(json);
  }
}

export default BaseModel;
