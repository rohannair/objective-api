exports.up = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.bigInteger('target_ends_at')
    })
}

exports.down = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.dropColumn('target_ends_at')
    })
}