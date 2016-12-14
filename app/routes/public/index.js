// Deps
'use strict';

import router from 'koa-router';

// Controllers
import * as users from './users';

module.exports = router()
  .all('/', async ctx => ctx.body = { message: 'Welcome!' })
  .post('/login', users.login)
  .post('/forgotpassword', users.forgotPassword)
  .post('/signup', users.signup)
  .post('/finishinvite', users.finishInvite)
  .post('/createUser', users.createUser);
// TODO: need a create company API
// .post('/createCompany', createCompany)
