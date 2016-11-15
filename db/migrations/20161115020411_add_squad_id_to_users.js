
exports.up = function(knex, Promise) {
  return knex.schema
    .table('users', t => {
      t.uuid('squad_id')
        .references('id')
        .inTable('squads')
        .onDelete('cascade')
        .index();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('users', t => {
      t.dropColumn('users');
    });
};
