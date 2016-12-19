'use strict';
import Company from '../../models/Company';
import User from '../../models/User';

import { addId } from '../../utils';
import jwt from 'jsonwebtoken';

/* eslint-disable no-unused-vars */
import chalk from 'chalk';
const debug = require('debug')('app:debug');
const logError = require('debug')('app:error');
/* eslint-enable no-unused-vars */

import { auth0 } from '../../config/auth0';

const userControllers = User => ({
  login: async ctx => {
    ctx.throw(500, 'DEPRECATED ENDPOINT');
  },

  forgotPassword: async ctx => {
    ctx.throw(500, 'DEPRECATED ENDPOINT');
  },

  finishInvite: async ctx => {
    ctx.throw(500, 'DEPRECATED ENDPOINT');
  },

  signup: async ctx => {
    ctx.throw(500, 'DEPRECATED ENDPOINT');
  },

  createUser: async ctx => {
    const { body: { token, state } } = ctx.request;
    const decodedJWT = jwt.decode(token);
    const {
      email,
      user: { given_name, family_name, picture, user_id }
    } = decodedJWT;

    // Does user exist?
    let user = await User.query()
      .where('email', email)
      .select('id', 'company_id', 'role')
      .first();

    if (!user) {
      const domain = email.split('@')[1];
      const company = await Company.query()
        .where('domain', domain)
        .select('id')
        .first();

      const newUser = addId({
        email,
        firstName: given_name,
        lastName: family_name,
        img: picture,
        pending: false,
        company_id: company.id
      });


      user = await User
        .query()
        .insert(newUser)
        .returning(['id', 'company_id', 'role']);
    }

    await auth0.users.update({ id: user_id }, {
      app_metadata: {
        oiq_id: user.id,
        c_id: user.companyId,
        role: user.role
      },
    });

    ctx.status = 201;
    ctx.body = { state, token };
  }
});

module.exports = userControllers(User);
