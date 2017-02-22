
exports.up = function(knex) {
  return knex.schema
    .table('snapshots', t => {
      t.jsonb('body_json')
    })
}

exports.down = function(knex) {
  return knex.schema
    .table('snapshots', t => {
      t.dropColumn('body_json')
    })
}
