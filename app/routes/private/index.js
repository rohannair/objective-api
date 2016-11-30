'use strict';

import router from 'koa-router';

import Company from '../../models/Company';
import User from '../../models/User';

import { addId, createRandomToken } from '../../utils';
import { randomPassword, encryptPassword, checkPassword } from '../../utils/encryption';

/* eslint-disable no-unused-vars */
import chalk from 'chalk';
import { sendEmail } from '../../config/mailer';
const debug = require('debug')('app:privateRouter');
/* eslint-enable no-unused-vars */

module.exports = router()
  .use(async (ctx, next) => {
    try {
      const { password } = ctx.request.body;

      // Send email
      const isPassword = async () => {
        const existing = await encryptPassword(process.env.ADMINPASSWORD);
        return new Promise((resolve, reject) => {
          if (!checkPassword(password, existing)) reject(false);
          resolve(true);
        });
      };

      await isPassword(password);
      await next();
    } catch (e) {
      ctx.status = 401;
      ctx.body = {
        message: 'DENIED'
      };
    }
  })
  .get('/createCompany', async ctx => {
    ctx.body = {
      shape: '{companyName, companyDomain, userEmail, userJobTitle}'
    };
  })
  .post('/createCompany', async ctx => {
    const {
      companyName,
      companyDomain,
      userEmail,
      userJobTitle
    } = ctx.request.body;

    const companyInfo = addId({
      name: companyName,
      domain: companyDomain
    });

    const company = await Company
      .query()
      .insert(companyInfo);

    const passwordDigest = await randomPassword().then(encryptPassword);
    const userInfo = addId({
      email: userEmail,
      companyId: company.id,
      job_title: userJobTitle,
      signup_token: await createRandomToken(),
      digest: passwordDigest,
      role: 'admin'
    });

    const user = await User
      .query()
      .insert(userInfo);

    ctx.status = 201;
    ctx.body = {
      company,
      user,
      message: `Company ${company.name} and user ${user.email} were created`
    };

  });
