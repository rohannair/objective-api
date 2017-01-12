
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('reactions_snapshots', t => {
    t.increments('id').primary()
    t.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
      .index()

    t.integer('snapshot_id')
      .references('id')
      .inTable('snapshots')
      .onDelete('cascade')
      .index()

    t.integer('reaction_id')
      .references('id')
      .inTable('reactions')
      .onDelete('cascade')
      .index()

    t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
  })
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE reactions_snapshots CASCADE;')
}
