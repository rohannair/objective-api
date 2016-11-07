/**
 * Setup Migration
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('companies', t => {
      t.uuid('id').primary();
      t.text('name');
      t.text('domain').unique();
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })

    .createTableIfNotExists('users', t => {
      t.uuid('id').primary();
      t.text('email').notNull().unique();
      t.text('first_name');
      t.text('last_name');
      t.string('digest');
      t.string('img');
      t.text('job_title');
      t.boolean('pending').defaultTo('true');
      t.enu('role', ['user', 'admin', 'superuser'])
        .notNull()
        .default('user');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));

      t.uuid('company_id')
        .references('id')
        .inTable('companies')
        .onDelete('cascade')
        .index();
    })

    .createTableIfNotExists('squads', t => {
      t.uuid('id').primary();
      t.string('name');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at') .defaultTo(knex.raw('now()'));

      t.uuid('company_id')
        .references('id')
        .inTable('companies')
        .onDelete('cascade')
        .index();

      t.uuid('leader')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .index();
    })

    .createTableIfNotExists('objectives', t => {
      t.uuid('id').primary();
      t.string('name');
      t.string('timeline');
      t.enu('status',['draft', 'unassigned', 'in progress', 'completed', 'archived'])
        .notNull()
        .default('draft');
      t.timestamp('ends_at');
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));

      t.uuid('squad_id')
        .references('id')
        .inTable('squads')
        .index();

      t.uuid('user_id')
        .references('id')
        .inTable('users')
        .index();
    })

    .createTableIfNotExists('squads_users', t => {
      t.increments('id').primary();

      t.uuid('user_id')
        .references('id')
        .inTable('users')
        .index();

      t.uuid('squad_id')
        .references('id')
        .inTable('squads')
        .index();
    })

    .createTableIfNotExists('key_results', t => {
      t.increments('id').primary();
      t.string('name');
      t.enu('status', ['draft', 'behind', 'ahead'])
        .notNull()
        .default('draft');

      t.uuid('objective_id')
        .references('id')
        .inTable('objectives')
        .onDelete('cascade')
        .index();

      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })


    .createTableIfNotExists('check_ins', t => {
      t.increments('id').primary();
      t.string('name');
      t.string('body');
      t.bool('completed').default(false);
      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));

      t.biginteger('key_result_id')
        .references('id')
        .inTable('key_results')
        .onDelete('cascade')
        .index();

      t.uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .index();
    })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE companies CASCADE'),
    knex.schema.raw('DROP TABLE users CASCADE'),
    knex.schema.raw('DROP TABLE squads CASCADE'),
    knex.schema.raw('DROP TABLE objectives CASCADE'),
    knex.schema.raw('DROP TABLE squads_users CASCADE'),
    knex.schema.raw('DROP TABLE key_results CASCADE'),
    knex.schema.raw('DROP TABLE check_ins CASCADE')
  ])
};
