const { Model } = require('objection');

class Mission extends Model {
  static get tableName() {
    return 'missions';
  }
}

module.exports = Mission;
