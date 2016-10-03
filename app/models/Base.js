const { Model } = require('objection');

const camelCase = require('lodash/camelCase');
const mapKeys = require('lodash/mapKeys');
const snakeCase = require('lodash/snakeCase');

class BaseModel extends Model {
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

module.exports = BaseModel;
