
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('check_ins', t => {
      t.increments('id').primary();
      t.string('name');
      t.string('body');
      t.bool('completed').default(false);
      t.uuid('mission_id')
        .references('id')
        .inTable('missions')
        .onDelete('cascade')
        .index();

      t.uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .index();

      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('DROP TABLE check_ins CASCADE')
};
