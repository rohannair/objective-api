
exports.up = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.boolean('is_private')
        .defaultTo(false)
    })
}

exports.down = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.dropColumn('is_private')
    })
}
