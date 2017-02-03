
exports.up = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.boolean('is_private')
        .defaultTo(false)
        .index('is_private')
    })
}

exports.down = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.dropColumn('is_private')
        .dropIndex('is_private')
    })
}
