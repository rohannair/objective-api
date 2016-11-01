
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('companies_missions', t => {
      t.bigIncrements('id').primary();
      t.uuid('company_id')
        .references('id')
        .inTable('companies')
        .onDelete('cascade')
        .index();

      t.uuid('mission_id')
        .references('id')
        .inTable('missions')
        .onDelete('cascade')
        .index();

      t.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
      t.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
    .table('missions', t => {
      t.uuid('parent')
        .references('id')
        .inTable('missions')
        .onDelete('cascade')
        .nullable();
    })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE companies_missions CASCADE'),
    knex.schema.table('missions', t => {
      t.dropColumn('parent');
    })
  ])
};
