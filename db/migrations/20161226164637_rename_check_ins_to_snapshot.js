
exports.up = function(knex) {
  return knex.schema.renameTable('check_ins', 'snapshots');
};

exports.down = function(knex) {
  return knex.schema.renameTable('snapshots', 'check_ins');
};
