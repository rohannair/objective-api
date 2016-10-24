const User = require('../../models/User');

const {
  encryptPassword,
  checkPassword
} = require('../../utils/encryption');

const {
  genToken
} = require('../../utils/auth');

const userControllers = User => ({
  login: async ctx => {
    const { username, password } = ctx.request.body;
    if (!username || !password) return ctx.status = 400;

    let user = await User
      .query()
      .select('id', 'email', 'digest', 'role', 'company_id', 'img')
      .where({
        email: username
      })
      .first();

    if (!user) {
      ctx.status = 400;
      ctx.body = {
        status: 1,
        message: 'Cannot find that user!'
      }
    } else {
      let passwordCheck = await checkPassword(password, user.digest);
      if (!passwordCheck) {
        ctx.status = 401;
        ctx.body = {
          status: 1,
          message: 'Incorrect password'
        }
      } else {
        const token = await genToken(user);
        ctx.status = 200;
        ctx.body = {
          status: 0,
          user: user.id,
          token
        }
      }
    }
  }
});

module.exports = userControllers(User);
