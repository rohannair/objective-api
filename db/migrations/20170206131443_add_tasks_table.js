
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('tasks', t => {
      t.uuid('id').primary()
      t.string('title')
      t.boolean('is_complete')

      t.uuid('objective_id')
        .references('id')
        .inTable('objectives')
        .onDelete('cascade')
        .index()

      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
    })
}

exports.down = function(knex) {
  return knex.raw('DROP TABLE tasks;')
}
