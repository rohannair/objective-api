'use strict';

import router from 'koa-router';

import Company from '../../models/Company';
import User from '../../models/User';

import { addId, createRandomToken } from '../../utils';
import { randomPassword, encryptPassword } from '../../utils/encryption';

const debug = require('debug')('app:privateRouter');

module.exports = router()
  .get('/createCompany', async ctx => {
    ctx.body = {
      shape: `{companyName, companyDomain, userEmail, userJobTitle}`
    }
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

    debug('BEFORE COMPANY INSERT', JSON.stringify(companyInfo, null, 3));

    const company = await Company
      .query()
      .insert(companyInfo);

    debug('AFTER COMPANY INSERT', JSON.stringify(company, null, 3));
    const passwordDigest = await randomPassword().then(encryptPassword);
    const userInfo = addId({
      email: userEmail,
      companyId: company.id,
      job_title: userJobTitle,
      signup_token: await createRandomToken(),
      digest: passwordDigest,
      role: 'admin'
    });

    debug('BEFORE USER INSERT', JSON.stringify(userInfo, null, 3));

    const user = await User
      .query()
      .insert(userInfo);

    debug('AFTER USER INSERT', JSON.stringify(user, null, 3));

    ctx.status = 201;
    ctx.body = {
      company,
      user,
      message: `Company ${company.name} and user ${user.email} were created`
    };

  })
