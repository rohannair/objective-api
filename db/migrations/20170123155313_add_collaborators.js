
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('objectives_users', t => {
      t.increments('id').primary()

      t.uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .index()

      t.uuid('objective_id')
        .references('id')
        .inTable('objectives')
        .onDelete('cascade')
        .index()

      t.unique(['objective_id', 'user_id'])
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
    })
}

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE objectives_users CASCADE')
}
