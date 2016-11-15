
exports.up = function(knex, Promise) {
  return knex.schema
    .table('users', t => {
      t.text('signup_token');
      t.text('reset_token');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('users', t => {
      t.dropColumn('signup_token');
      t.dropColumn('reset_token');
    });
};
