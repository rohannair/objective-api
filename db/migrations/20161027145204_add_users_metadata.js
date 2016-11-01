/**
 * Adding more metadata to users
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .table('users', t => {
      t.text('job_title');
      t.boolean('pending').defaultTo('true');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('users', t => {
      t.dropColumn('job_title');
      t.dropColumn('pending');
    })
};
