
exports.up = function(knex, Promise) {
  return knex.schema
    .table('missions', t => {
      t.timestamp('end_at');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('missions', t => {
      t.dropColumn('end_at');
    })
};
