
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .table('check_ins', t => {
        t.uuid('company_id')
          .references('id')
          .inTable('companies')
          .onDelete('cascade')
          .index();
      }),

    knex.schema
      .table('objectives', t => {
        t.uuid('company_id')
          .references('id')
          .inTable('companies')
          .onDelete('cascade')
          .index();
      }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .table('check_ins', t => {
        t.dropColumn('company_id');
      }),
    knex.schema
      .table('check_ins', t => {
        t.dropColumn('company_id');
      })
  ])
};
