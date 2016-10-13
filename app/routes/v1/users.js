const User = require('../../models/User');

const {
  encryptPassword,
  checkPassword
} = require('../../utils/encryption');

const {
  genToken
} = require('../../utils/token');

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
  },

  searchUsers: async ctx => {
    const { q } = ctx.query;

    const results = await User
      .query()
      .select('id', 'first_name', 'last_name', 'email', 'role', 'img')
      .where('email', 'LIKE', q + '%')
      .orWhere('first_name', 'LIKE', q + '%')
      .orWhere('last_name', 'LIKE', q + '%');

    ctx.body = { results };
  },

  getUsers: async ctx => {
    const { limit, offset } = ctx.query;

    const results = await User
      .query()
      .select('id', 'first_name', 'last_name', 'email', 'role', 'img')
      .limit(limit || 25)
      .offset(offset || 0)
      .orderBy('last_name');

    ctx.body = {
      results,
      nextOffset: offset + limit | 25,
      nextLimit: limit || 25
    }
  },

  getOneUser: async ctx => {
    const { id } = ctx.params;

    const user = await User
      .query()
      .select('id', 'first_name', 'last_name', 'email', 'role', 'img')
      .where({id})
      .first();

    ctx.body = { user };
  },

  updateUser: async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request;

    // Does user have permission to edit?
    const user = User
      .query()
      .update({
        ...ctx.request.body
      })
      .where({ id })
      .returning(['id', 'first_name', 'last_name', 'email', 'role', 'img'])
  }

});

module.exports = userControllers(User);
