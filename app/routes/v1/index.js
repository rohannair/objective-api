// Deps
'use strict';

import router from 'koa-router';

// Middleware
import { isAuthed } from '../../middleware';

// Controllers
import {
  logout,
  searchUsers,
  getUsers,
  getOneUser,
  updateUser
} from './users';

import {
  getMissions,
  getOneMission,
  addResource,
  addObjective,
  addTarget,
  newMission,
  updateMission
} from './missions';

import { updateResource } from './resources';
import { updateObjective } from './objectives';
import { updateTarget } from './targets';

// Routes
module.exports = router()
  .use(isAuthed)
  .all('/', async ctx => ctx.body = { message: 'Welcome to the v1 API'})

  .get('/users', getUsers)
  .get('/users/search', searchUsers)
  .get('/users/:id', getOneUser)
  .post('/user/:id', updateUser)
  .post('/logout', logout)

  .get('/missions', getMissions)
  .get('/missions/new', newMission)
  .get('/missions/:id', getOneMission)
  .post('/missions/:id', updateMission)

  .get('/missions/:id/resources/add', addResource)
  .post('/missions/:id/resources/:resourceId', updateResource)

  .get('/missions/:id/objectives/add', addObjective)
  .post('/missions/:id/objectives/:objectiveId', updateObjective)

  .get('/missions/:id/targets/add', addTarget)
  .post('/missions/:id/targets/:targetId', updateTarget)

