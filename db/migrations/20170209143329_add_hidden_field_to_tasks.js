
exports.up = function(knex) {
  return knex.schema
    .table('tasks', t => {
      t.boolean('hidden').default(false)
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('tasks', t => {
      t.dropColumn('hidden')
    })
};
