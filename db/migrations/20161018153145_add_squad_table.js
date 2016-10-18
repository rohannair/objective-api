/**
 * Creates the squads table, akin to a team, and then the two join
 * tables for it, as a squad can/should have a mission, and users
 * belong to squads
 *
 * Keeping many:many relationship for users to squads because a user
 * can belong to multiple squads.
 * E.G. a VP can be in Management squad, and in their group's squad
 *
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('squads', t => {
      t.bigIncrements('id').primary();
      t.string('name');
      t.uuid('company_id')
        .references('id')
        .inTable('companies')
        .onDelete('cascade')
        .index();
      t.uuid('creator')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .index();
      t.timestamp('created_at')
        .notNull()
        .defaultTo(knex.raw('now()'));
      t.timestamp('updated_at')
        .defaultTo(knex.raw('now()'));
    })
    .then(() => Promise.all([
      knex.schema.createTable('missions_squads', t => {
        t.increments('id').primary();
        t.uuid('mission_id')
          .references('id')
          .inTable('missions')
          .index();
        t.bigInteger('squad_id')
          .references('id')
          .inTable('squads')
          .index();
      }),
      knex.schema.createTable('squads_users', t => {
        t.increments('id').primary();
        t.bigInteger('squad_id')
          .references('id')
          .inTable('squads')
          .index();
        t.uuid('user_id')
          .references('id')
          .inTable('users')
          .index();
      })
    ]))
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE missions_squads CASCADE'),
    knex.schema.raw('DROP TABLE squads_users CASCADE'),
    knex.schema.raw('DROP TABLE squads CASCADE')
  ]);
};
