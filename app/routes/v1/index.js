// Deps
'use strict';

import router from 'koa-router';

// Middleware
import { isAuthed } from '../../middleware';

// Controllers
import * as users from './users';
import * as squads from './squads';
import * as objectives from './objectives';

import * as emails from './emails';

// Routes
module.exports = router()
  .use(isAuthed)
  .all('/', async ctx => ctx.body = { message: 'Welcome to the v1 API'})

  .get('/users', users.get)
  .get('/users/search', users.search)
  .post('/user/invite', users.invite)
  .get('/user/:id', users.getOne)
  .post('/user/:id', users.update)
  .post('/user/:id/objective', users.createObjective)

  .post('/logout', users.logout)

  .get('/squads', squads.get)
  .post('/squads/assign', squads.assignUser)
  .post('/squads', squads.create)

  .post('/objectives/add', objectives.create)
  .post('/objectives/:id/edit', objectives.update)
  .post('/objectives/:id/check_in', users.createCheckIn)

