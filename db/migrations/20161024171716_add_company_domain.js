/**
 * Creates domain name mappings to allow self-signup for
 * individual users in a company, based on email.
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .table('companies', t => {
      t.text('domain').unique();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('companies', t => {
      t.dropColumn('domain');
    })
};
