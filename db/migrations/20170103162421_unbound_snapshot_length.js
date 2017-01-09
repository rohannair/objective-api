
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('ALTER TABLE snapshots ALTER COLUMN body TYPE text'),
    knex.schema
      .table('snapshots', t => {
        t.json('content')
        t.string('img')
        t.integer('status')
      })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('ALTER TABLE snapshots ALTER COLUMN body TYPE string'),
    knex.schema
      .table('snapshots', t => {
        t.dropColumn('content')
        t.dropColumn('img')
        t.dropColumn('status')
      })
  ])
}
