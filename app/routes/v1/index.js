const router = require('koa-router');
const User = require('../../models/User');
const Mission = require('../../models/Mission');

const {
  encryptPassword,
  checkPassword
} = require('../../utils/encryption');

const {
  genToken
} = require('../../utils/token');

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

  .get('/missions/:id', async ctx => {
    const { id } = ctx.params;

    const mission = await Mission
      .query()
      .where({id})
      .first();

    ctx.body = {
      mission
    };
  })
