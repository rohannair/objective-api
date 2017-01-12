
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('reactions', t => {
    t.increments('id').primary()
    t.text('name').unique()

    t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
    t.timestamp('updated_at').defaultTo(knex.raw('now()'))
  })
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE reactions CASCADE;')
}
