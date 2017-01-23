
exports.up = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.uuid('owner_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .index()
    })
}

exports.down = function(knex) {
  return knex.schema
    .table('objectives', t => {
      t.dropColumn('owner_id')
    })
}
