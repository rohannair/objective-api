// Deps
'use strict';

import router from 'koa-router';

// Controllers
import {
  login,
  forgotPassword,
  signup,
  finishInvite
} from './users';

module.exports = router()
  .all('/', async ctx => ctx.body = { message: 'Welcome!' })
  .post('/login', login)
  .post('/forgotpassword', forgotPassword)
  .post('/signup', signup)
  .post('/finishinvite', finishInvite);
// TODO: need a create company API
// .post('/createCompany', createCompany)
