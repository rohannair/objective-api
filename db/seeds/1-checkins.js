const uuid = require('node-uuid');

let userIdRay = '87eb4549-07c9-418c-8417-38af1c7a5805';
let missionIdRay = '1a42e500-306e-4b52-862b-953806f6631d';

let userIdStu = '9f392a5b-8fc7-48af-9e27-f9831e50aed7';
let missionIdStu = 'c2defaf1-e79c-4745-8796-f034f20561c4';

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('missions_users').insert([
      { 'user_id': userIdRay, 'mission_id': missionIdRay },
      { 'user_id': userIdStu, 'mission_id': missionIdStu }
    ]),
    knex('check_ins').insert([
      {
        name: 'September 30th Progress Update',
        body: 'Researched CMSs and have decided on WordPress as it has best tools for SEO and lets the Marketing team put up their own content without Engineering assistance',
        'user_id': userIdStu,
        'mission_id': missionIdStu,
        'created_at': new Date('September 30 2016')
      },
      {
        name: 'October 7th Progress Update',
        body: 'Finished setting up WordPress for Marketing site, and have started on theming. Not quite at the point to measure SEO impact.',
        'user_id': userIdStu,
        'mission_id': missionIdStu,
        'created_at': new Date('October 7 2016')
      },
      {
        name: 'October 7th Progress',
        body: 'Signed 2 new customers this week for the betas. Met with 3 CEOs.',
        'user_id': userIdRay,
        'mission_id': missionIdRay,
        'created_at': new Date('October 7 2016')
      }
    ])
  ])
}
