'use strict';
import Company from '../../models/Company';
import User from '../../models/User';

import { addId } from '../../utils';
import omit from 'lodash/omit';
import jwt from 'jsonwebtoken';

/* eslint-disable no-unused-vars */
import chalk from 'chalk';
const debug = require('debug')('app:debug');
const logError = require('debug')('app:error');
/* eslint-enable no-unused-vars */

import { auth0 } from '../../config/auth0';

import {
  randomPassword,
  encryptPassword,
} from '../../utils/encryption';

import { forgotPassword } from '../v1/emails';
import { createRandomToken } from '../../utils';

const userControllers = User => ({
  login: async ctx => {
    ctx.throw(500, 'DEPRECATED ENDPOINT');
  },

  forgotPassword: async ctx => {
    const { email } = ctx.request.body;
    const domain = email.split('@')[1];
    const token = await createRandomToken();

    const company = Company.query()
      .select()
      .where({ domain });

    if (!company) {
      return ctx.throw(400, 'Invalid email domain; company not found');
    }

    const user = await User.query()
      .update({
        signup_token: token
      })
      .where({ email: email.toLowerCase() });

    if (!user) {
      return ctx.throw(400, 'User not found');
    }

    const forgotPasswordEmail = await forgotPassword({email, domain, token});
    debug('EMAIL STATUS', forgotPasswordEmail);

    ctx.status = 200;
    ctx.body = {
      message: `Password reset email sent to ${email}`
    };
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
      user_metadata: {
        oiq_id: user.id,
        c_id: user.companyId
      },
      role: user.role
    });

    ctx.status = 201;
    ctx.body = { state, token };
  }
});

module.exports = userControllers(User);
