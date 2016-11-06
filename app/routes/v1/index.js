// Deps
'use strict';

import router from 'koa-router';

// Middleware
import { isAuthed } from '../../middleware';

// Controllers
import * as users from './users';
import * as squads from './squads';

// Routes
module.exports = router()
  .use(isAuthed)
  .all('/', async ctx => ctx.body = { message: 'Welcome to the v1 API'})

  .get('/users', users.get)
  .get('/users/search', users.search)
  .get('/users/:id', users.getOne)
  .post('/user/invite', users.invite)
  .post('/user/:id', users.update)
  .post('/logout', users.logout)

  .get('/squads', squads.get)

