const router = require('koa-router');
const User = require('../../models/User');

const {
  Mission,
  getMission,
  getAllMissions
} = require('../../models/Mission');

const {
  Resource
} = require('../../models/Resource');

const Objective = require('../../models/Objective');

const MissionResource = require('../../models/MissionResource');
const MissionObjective = require('../../models/MissionObjective');

const {
  encryptPassword,
  checkPassword
} = require('../../utils/encryption');

const {
  genToken
} = require('../../utils/token');

const { addId } = require('../../utils');

module.exports = router()
  .all('/', async (ctx) => {
    ctx.body = {
      message: 'Welcome to the v1 API'
    }
  })

  .post('/login', async ctx => {
    const { username, password } = ctx.request.body;
    if (!username || !password) return ctx.status = 400;

    let user = await User
      .query()
      .select('id', 'email', 'digest', 'role', 'company_id')
      .where({
        email: username
      })
      .first();

    if (!user) {

      ctx.status = 400;
      ctx.body = {
        message: 'Cannot find that user!'
      }


    } else {

      let passwordCheck = await checkPassword(password, user.digest);
      if (!passwordCheck) {
        ctx.status = 401;
        ctx.body = {
          message: 'Incorrect password'
        }
      } else {
        let token = await genToken({
          id: user.id,
          email: user.email,
          role: user.role,
          companyId: user.company_id
        });

        ctx.status = 200;
        ctx.body = {
          message: 'Proper password!',
          token
        }
      }
    }

  })

  .get('/missions', async ctx => {
    const { limit, offset } = ctx.query;
    ctx.body = {
      missions: await getAllMissions(limit, offset)
    }
  })

  .get('/missions/:id', async ctx => {
    const { id } = ctx.params;

    const mission = await getMission(id);

    ctx.body = {
      mission
    };
  })

  .post('/missions/:id/resources/add', async ctx => {
    const { id } = ctx.params;
    const resource = addId(ctx.request.body.resource);

    const newResource = await Resource
      .query()
      .insert(resource);

    const newJoin = await MissionResource
      .query()
      .insert({
        mission_id: id,
        resource_id: newResource.id
      });

    ctx.status = 201;
    ctx.body = { inserted: newResource }
  })

  .get('/missions/:id/resources/add', async ctx => {
    const { id } = ctx.params;
    const resource = addId({ name: '' });
    const newResource = await Resource
      .query()
      .insert(resource)
      .returning('*');

    const newJoin = await MissionResource
      .query()
      .insertAndFetch({
        mission_id: id,
        resource_id: newResource.id
      });

    ctx.status = 201;
    ctx.body = { inserted: newResource }
  })

  .post('/missions/:id/resources/:resourceId', async ctx => {
    const { resourceId } = ctx.params;
    const updated = await Resource
      .query()
      .update({
        ...ctx.request.body
      })
      .where({ id: resourceId })
      .returning(['id', 'name', 'updated_at'])
      .first();

    ctx.status = 201;
    ctx.body = { updated };
  })

  .get('/missions/:id/objectives/add', async ctx => {
    const { id } = ctx.params;
    const objective = addId({ name: '' });
    const newObjective = await Objective
      .query()
      .insert(objective)
      .returning('*');

    const newJoin = await MissionObjective
      .query()
      .insert({
        mission_id: id,
        objective_id: newObjective.id
      });

    ctx.status = 201;
    ctx.body = { inserted: newObjective }
  })

  .post('/missions/:id/objectives/:objectiveId', async ctx => {
    const { objectiveId } = ctx.params;
    const updated = await Objective
      .query()
      .update({
        ...ctx.request.body
      })
      .where({ id: objectiveId })
      .returning(['id', 'name', 'completed', 'updated_at'])
      .first();

    ctx.status = 201;
    ctx.body = { updated };
  })
