'use strict';
import Company from '../../models/Company';
import User from '../../models/User';
import { addId } from '../../utils';
import omit from 'lodash/omit';
import Boom from 'boom';

import chalk from 'chalk';
const debug = require('debug')('app:debug');

import {
  encryptPassword,
  checkPassword
} from '../../utils/encryption';

import {
  genToken
} from '../../utils/auth';

import { forgotPassword } from '../v1/emails';

const userControllers = User => ({
  login: async ctx => {
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
          token,
          companyId: user.companyId
        }
      }
    }
  },

  forgotPassword: async ctx => {
    const { email } = ctx.body;

    try {
      // Todo check for finishedInvite
      await forgotPassword(email);
      ctx.status = 200;
      ctx.body = {
        message: `Password reset email sent to ${email}`
      };

    } catch(e) {

      ctx.status = 400;
      ctx.body = {
        ...e
      };

    }
  },

  finishInvite: async ctx => {
    const { email, token, firstName, lastName, img, password } = ctx.request.body;

    const digest = await encryptPassword(password);
    const user = await User
      .query()
      .update({
        email,
        firstName,
        lastName,
        img: img || '',
        pending: false,
        digest,
        signup_token: null
      })
      .whereNotNull('signup_token')
      .andWhere('email', email)
      .andWhere('signup_token', token)
      .returning(['id', 'email', 'digest', 'role', 'company_id'])
      .first();

    if (!user) {
      ctx.throw('Invalid signup_token', 400);
    }

    const loginToken = await genToken(user);

    ctx.status = 200;
    ctx.body = {
      status: 0,
      user: user.id,
      token: loginToken,
      companyId: user.companyId,
      message: 'User details updated'
    };
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
