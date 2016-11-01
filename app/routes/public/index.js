// Deps
'use strict';

import router from 'koa-router';

// Controllers
import {
  login,
  forgotPassword,
  signup
} from './users';

module.exports = router()
  .all('/', async ctx => ctx.body = { message: 'Welcome!' })
  .post('/login', login)
  .post('/forgotpassword', forgotPassword)
  .post('/signup', signup)
// TODO: need a create company API
// .post('/createCompany', createCompany)
