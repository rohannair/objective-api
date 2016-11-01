'use strict';
const Company = require('../../models/Company');
const User = require('../../models/User');
const { addId } = require('../../utils');
const omit = require('lodash/omit');

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
  },

  forgotPassword: async ctx => {
    // TODO: allow password reset
  },

  signup: async ctx => {
    const { body } = ctx.request;

    const domain = body.email.split('@')[1];
    const company = await Company
      .query()
      .where('domain', domain)
      .select('id')
      .first();

    const newUser = {
      ...addId({ email: body.email }),
      digest: await encryptPassword(body.password),
      company_id: company.id
    };

    const user = await User
      .query()
      .insert(newUser)
      .where('company_id', company)
      .returning(['id', 'first_name', 'last_name', 'email', 'role', 'img']);

    ctx.status = 201;
    ctx.body = { user: omit(user, 'digest') };
  }
});

module.exports = userControllers(User);
