const uuid = require('node-uuid');
const { encryptPassword } = require('../../app/utils/encryption');

exports.seed = function(knex, Promise) {
  let companyId = uuid.v4();
  let userId = uuid.v4();

  return encryptPassword('password123')
    .then(password => Promise.all([
      knex('companies').insert({
        id: companyId,
        name: 'Quartermaster'
      }),

      knex('users').insert({
        id: userId,
        email: 'rohan@qrtrmstr.com',
        first_name: 'Rohan',
        last_name: 'Nair',
        digest: password,
        role: 'superuser',
        company_id: companyId
      })
    ])
  );
}
