exports.seed = function(knex) {
  let companyId = '4b12f283-223e-4d96-b4ba-8429ed74dafc'
  let userId = 'e8e49354-a078-4832-8596-8fdc70ee6278'
  let userId2 = '87eb4549-07c9-418c-8417-38af1c7a5805'
  let userId3 = '9f392a5b-8fc7-48af-9e27-f9831e50aed7'
  let userId4 = 'b2aec89b-e83a-4bff-8caf-bebca78074e6'
  let userId5 = '49ac9cbe-c496-45a9-b97b-d59115031762'

  let objectiveId = '1a42e500-306e-4b52-862b-953806f6631d'
  let objectiveId2 = '97e0e448-9f99-4770-9f54-adab5d48cb2b'
  let objectiveId3 = '46842bee-2852-4991-922b-6ad4aabb5bc6'

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
    knex('objectives').insert([
      {
        id: objectiveId,
        name: 'Test objective #1',
        target_ends_at: +new Date('2017-12-31'),
        company_id: companyId
      },
      {
        id: objectiveId2,
        name: 'Test objective #2',
        target_ends_at: +new Date('2017-12-31'),
        company_id: companyId,
        owner_id: userId2,
        is_private: true
      },
      {
        id: objectiveId3,
        name: 'Test objective #3',
        target_ends_at: +new Date('2017-12-31'),
        company_id: companyId,

        owner_id: userId3,
        is_private: true
      }
    ])
  )

  .then(() =>
    knex('objectives_users').insert({
      user_id: userId,
      objective_id: objectiveId3
    })
  )

  .then(() =>
    knex('tasks').insert([
      {
        title: 'Meet with CEO',
        is_complete: false,
        objective_id: objectiveId
      },
      {
        title: 'Keep seed up to Date',
        is_complete: true,
        objective_id: objectiveId2
      }
    ])
  )

  .then(() =>
    knex('snapshots').insert([
      {
        body: 'I did some cool stuff today on this',
        objective_id: objectiveId,
        user_id: userId,
        company_id: companyId
      },
      {
        body: 'I tried some cool stuff here but shouldn\'t see it in my feed',
        objective_id: objectiveId2,
        user_id: userId2,
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
