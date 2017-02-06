const uuid = require('node-uuid');

exports.seed = function(knex, Promise) {
  let companyId = '4b12f283-223e-4d96-b4ba-8429ed74dafc';
  let userId = 'e8e49354-a078-4832-8596-8fdc70ee6278';
  let userId2 = '87eb4549-07c9-418c-8417-38af1c7a5805';
  let userId3 = '9f392a5b-8fc7-48af-9e27-f9831e50aed7';
  let userId4 = 'b2aec89b-e83a-4bff-8caf-bebca78074e6';
  let userId5 = '49ac9cbe-c496-45a9-b97b-d59115031762';
  let squadId = 'c2defaf1-e79c-4745-8796-f034f20561c4';
  let objectiveId = '1a42e500-306e-4b52-862b-953806f6631d';
  let taskId = '6f1e007a-3526-4a4a-8c6e-4f4416a175d5';

  return knex('companies').insert({
    id: companyId,
    name: 'objectiveIQ',
    domain: 'objectiveiq.com'
  })

  .then(() =>
    knex('users').insert([
      {
        id: userId,
        email: 'rohan@objectiveiq.com',
        first_name: 'Rohan',
        last_name: 'Nair',
        img: 'https://avatars.io/instagram/therealrohannair',
        job_title: 'CTO',
        pending: false,
        role: 'superuser',
        company_id: companyId
      },
      {
        id: userId2,
        email: 'ray@objectiveiq.com',
        first_name: 'Ray',
        last_name: 'Kanani',
        img: 'https://avatars.io/twitter/raykanani',
        job_title: 'CEO',
        pending: false,
        role: 'admin',
        company_id: companyId
      },
      {
        id: userId3,
        email: 'stuart@objectiveiq.com',
        first_name: 'Stu',
        last_name: 'Peters',
        img: 'https://avatars.io/facebook/stu.peters.3',
        job_title: 'Operations',
        pending: false,
        role: 'admin',
        company_id: companyId
      },
      {
        id: userId4,
        email: 'ghislain@objectiveiq.com',
        first_name: 'Ghislain',
        last_name: 'Le Sergeant',
        img: '',
        job_title: 'Developer',
        pending: false,
        role: 'admin',
        company_id: companyId
      },
      {
        id: userId5,
        email: 'david@objectiveiq.com',
        first_name: 'David',
        last_name: 'Mills',
        img: 'https://avatars.io/twitter/daegren',
        job_title: 'Software Crafstman',
        pending: false,
        role: 'admin',
        company_id: companyId
      },
    ])
  )

  .then(() =>
    knex('squads').insert([
      {
        id: squadId,
        name: 'Product Squad',
        company_id: companyId,
        leader: userId
      }
    ])
  )

  .then(() =>
    knex('objectives').insert({
      id: objectiveId,
      name: 'Build CEO Dashboard',
      timeline: '3 months',
      squad_id: squadId,
      company_id: companyId
    })
  )

  .then(() =>
    knex('tasks').insert({
      id: taskId,
      title: 'Meet with CEO',
      is_complete: false,
      objective_id: objectiveId
    })
  )

  .then(() =>
    knex('key_results').insert({
      name: 'Ability to show aggregate performance',
      objective_id: objectiveId
    })
  )

  .then(() =>
    knex('squads_users').insert({
      squad_id: squadId,
      user_id: userId
    })
  )

  .then(() =>
    knex('snapshots').insert([
      {
        name: 'This shouldn\'t matter',
        body: 'I did some cool stuff today on this',
        objective_id: objectiveId,
        user_id: userId,
        company_id: companyId
      },
      {
        name: 'This shouldn\'t matter',
        body: 'I also did some cool stuff here',
        objective_id: objectiveId,
        user_id: userId,
        company_id: companyId
      }
    ])
  )
  .then(() =>
    knex('reactions').insert({
      name: 'like'
    })
  )

}
