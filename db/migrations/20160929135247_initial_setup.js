/**
 * Setup Migration
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('objectives', t => {
      t.uuid('id').primary();
      t.string('name').notNull();
      t.bool('completed').default(false);
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
    .createTable('targets', t => {
      t.uuid('id').primary();
      t.text('objective').notNull();
      t.specificType('key_results', 'text[]');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
    .createTable('resources', t => {
      t.uuid('id').primary();
      t.text('name');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
    .createTable('missions', t => {
      t.uuid('id').primary();
      t.string('name');
      t.text('description');
      t.string('duration');
      t.enu('status',['draft', 'unassigned', 'in progress', 'completed', 'archived'])
        .notNull()
        .default('draft');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
    .createTable('companies', t => {
      t.uuid('id').primary();
      t.text('name');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
    .createTable('users', t => {
      t.uuid('id').primary();
      t.text('email').notNull().unique();
      t.text('first_name');
      t.text('last_name');
      t.string('password');
      t.enu('role', ['user', 'admin', 'superuser'])
        .notNull()
        .default('user');
      t.uuid('company_id').references('id').inTable('companies').onDelete('cascade');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
    .createTable('missions_users', t => {
      t.increments('id').primary();
      t.uuid('user_id').references('id').inTable('users');
      t.uuid('mission_id').references('id').inTable('missions');
    })
    .createTable('missions_resources', t => {
      t.increments('id').primary();
      t.uuid('mission_id').references('id').inTable('missions');
      t.uuid('resource_id').references('id').inTable('resources');
    })
    .createTable('missions_objectives', t => {
      t.increments('id').primary();
      t.uuid('mission_id').references('id').inTable('missions');
      t.uuid('objective_id').references('id').inTable('objectives');
    })
    .createTable('missions_targets', t => {
      t.increments('id').primary();
      t.uuid('mission_id').references('id').inTable('missions');
      t.uuid('target_id').references('id').inTable('targets');
    })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE objectives CASCADE'),
    knex.schema.raw('DROP TABLE targets CASCADE'),
    knex.schema.raw('DROP TABLE resources CASCADE'),
    knex.schema.raw('DROP TABLE missions CASCADE'),
    knex.schema.raw('DROP TABLE companies CASCADE'),
    knex.schema.raw('DROP TABLE users CASCADE'),
    knex.schema.raw('DROP TABLE missions_users CASCADE'),
    knex.schema.raw('DROP TABLE missions_resources CASCADE'),
    knex.schema.raw('DROP TABLE missions_objectives CASCADE'),
    knex.schema.raw('DROP TABLE missions_targets CASCADE')
  ])
};
