const uuid = require('node-uuid');
const { encryptPassword } = require('../utils/encryption');

exports.seed = function(knex, Promise) {
  let companyId = '4b12f283-223e-4d96-b4ba-8429ed74dafc';
  let userId = 'e8e49354-a078-4832-8596-8fdc70ee6278';
  let userId2 = '87eb4549-07c9-418c-8417-38af1c7a5805';
  let userId3 = '9f392a5b-8fc7-48af-9e27-f9831e50aed7';
  let squadId = 'c2defaf1-e79c-4745-8796-f034f20561c4';
  let objectiveId = '1a42e500-306e-4b52-862b-953806f6631d';

  return knex('companies').insert({
    id: companyId,
    name: 'Quartermaster',
    domain: 'qrtrmstr.com'
  })

  .then(_ => encryptPassword('password123'))
  .then(password =>
    knex('users').insert([
      {
        id: userId,
        email: 'rohan@qrtrmstr.com',
        first_name: 'Rohan',
        last_name: 'Nair',
        digest: password,
        img: 'https://avatars.io/instagram/therealrohannair',
        job_title: 'CTO',
        pending: false,
        role: 'superuser',
        company_id: companyId
      },
      {
        id: userId2,
        email: 'ray@qrtrmstr.com',
        first_name: 'Ray',
        last_name: 'Kanani',
        digest: password,
        img: 'https://avatars.io/twitter/raykanani',
        job_title: 'CEO',
        pending: false,
        role: 'admin',
        company_id: companyId
      },
      {
        id: userId3,
        email: 'stuart@qrtrmstr.com',
        first_name: 'Stu',
        last_name: 'Peters',
        digest: password,
        img: 'https://avatars.io/facebook/stu.peters.3',
        job_title: 'Operations',
        pending: false,
        role: 'admin',
        company_id: companyId
      },
    ])
  )

  .then(_ =>
    knex('squads').insert([
      {
        id: squadId,
        name: 'Product Squad',
        company_id: companyId,
        leader: userId
      }
    ])
  )

  .then(_ =>
    knex('objectives').insert({
      id: objectiveId,
      name: 'Build CEO Dashboard',
      timeline: '3 months',
      squad_id: squadId
    })
  )

  .then(_ =>
    knex('key_results').insert({
      name: 'Ability to show aggregate performance',
      objective_id: objectiveId
    })
  )

  .then(_ =>
    knex('squads_users').insert({
      squad_id: squadId,
      user_id: userId
    })
  )

}
