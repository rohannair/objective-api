/**
 * Adding the blocker attribute to check-ins
 */
exports.up = function(knex) {
  return knex.schema
    .table('check_ins', t => {
      t.boolean('blocker').defaultTo('false');
    });
};

exports.down = function(knex) {
  return knex.schema
    .table('check_ins', t => {
      t.dropColumn('blocker');
    });
};
