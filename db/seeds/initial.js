const uuid = require('node-uuid');
const { encryptPassword } = require('../../app/utils/encryption');

exports.seed = function(knex, Promise) {
  let companyId = uuid.v4();
  let userId = uuid.v4();
  let userId2 = '87eb4549-07c9-418c-8417-38af1c7a5805';
  let userId3 = '9f392a5b-8fc7-48af-9e27-f9831e50aed7';
  let missionId = 'c2defaf1-e79c-4745-8796-f034f20561c4';
  let missionId2 = '1a42e500-306e-4b52-862b-953806f6631d';

  return encryptPassword('password123')
    .then(password => Promise.all([
      knex('companies').insert({
        id: companyId,
        name: 'Quartermaster'
      }).then(() =>
        knex('users').insert([
          {
            id: userId,
            email: 'rohan@qrtrmstr.com',
            first_name: 'Rohan',
            last_name: 'Nair',
            digest: password,
            role: 'superuser',
            company_id: companyId
          },
          {
            id: userId2,
            email: 'ray@qrtrmstr.com',
            first_name: 'Ray',
            last_name: 'Kanani',
            digest: password,
            role: 'admin',
            company_id: companyId
          },
          {
            id: userId3,
            email: 'stuart@qrtrmstr.com',
            first_name: 'Stu',
            last_name: 'Peters',
            digest: password,
            role: 'admin',
            company_id: companyId
          },
        ])
      ),

      knex('missions').insert([{
        id: missionId,
        name: 'Marketing Design Tour',
        description: 'Support the Marketing Team\'s creative initiatives while developing a style guide and a design system for the full company',
        duration: '12 months'
      },
      {
        id: missionId2,
        name: 'Grow the beta cohort',
        description: 'Get new customers signed on for the next beta cohort',
        duration: '3 months'
      }]),

      knex('objectives').insert([
        {
          id: '6276a2b5-f49d-4ad7-8780-ad32fd22bfb9',
          name: 'Learn Sketch'
        },
        {
          id: '6134edd1-56c4-411a-8f09-5436e90f24bb',
          name: 'Speak at a Design Conference'
        },
        {
          id: 'ed52e307-a5e6-47b9-bf6b-a3615e5ab7e3',
          name: 'Become really good at pitching the product'
        }
      ]),

      knex('targets').insert([
        {
          id: '39aede9c-5185-4e87-82fb-3b4948f6f09a',
          objective: 'Design consistency across entire company',
          key_results: [
            'Create a style guide based off existing style conventions',
            'Get all 8 teams using the same style guide'
          ]
        },
        {
          id: 'bb82018b-0b86-4d5b-a7e2-d92a2b6d7ce4',
          objective: 'Props organization and storage of design assets',
          key_results: [
            'Get 80% of source files properly organized into Google Drive'
          ]
        },
        {
          id: '2d8ccd9f-e00f-436b-9a06-a5f1a8be4b2d',
          objective: 'Get a database of warm leads',
          key_results: [
            'Cold call 25 prospective customers',
            'Achieve a 5% meeting rate'
          ]
        }
      ]),

      knex('resources').insert([
        {
          id: '879a88b0-0530-4835-a23f-dcfc3552b5c0',
          name: 'Head of Design @raykanani'
        },
        {
          id: '6938586c-951d-44f4-918f-733a759858fe',
          name: 'Head of Marketing @raykananisalterego'
        },
        {
          id: '57306734-52dd-4372-a4a6-4abf0006c9b5',
          name: 'Quartermaster usability lab'
        }
      ]),

      knex('missions_resources').insert([
        {
          mission_id: missionId,
          resource_id: '879a88b0-0530-4835-a23f-dcfc3552b5c0'
        },
        {
          mission_id: missionId,
          resource_id: '6938586c-951d-44f4-918f-733a759858fe'
        },
        {
          mission_id: missionId,
          resource_id: '57306734-52dd-4372-a4a6-4abf0006c9b5'
        },
        {
          mission_id: missionId2,
          resource_id: '6938586c-951d-44f4-918f-733a759858fe'
        }
      ]),

      knex('missions_targets').insert([
        {
          mission_id: missionId,
          target_id: '39aede9c-5185-4e87-82fb-3b4948f6f09a'
        },
        {
          mission_id: missionId2,
          target_id: 'bb82018b-0b86-4d5b-a7e2-d92a2b6d7ce4'
        },
        {
          mission_id: missionId2,
          target_id: '2d8ccd9f-e00f-436b-9a06-a5f1a8be4b2d'
        }
      ]),

      knex('missions_objectives').insert([
        {
          objective_id: '6276a2b5-f49d-4ad7-8780-ad32fd22bfb9',
          mission_id: missionId
        },
        {
          objective_id: '6134edd1-56c4-411a-8f09-5436e90f24bb',
          mission_id: missionId
        },
        {
          objective_id: 'ed52e307-a5e6-47b9-bf6b-a3615e5ab7e3',
          mission_id: missionId2
        }
      ]),
    ])
  )
}
