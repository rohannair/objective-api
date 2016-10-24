// Deps
const router = require('koa-router');

// Middleware
const { isAuthed } = require('../../middleware');

// Controllers
const {
  logout,
  searchUsers,
  getUsers,
  getOneUser,
  updateUser
} = require('./users');

const {
  getMissions,
  getOneMission,
  addResource,
  addObjective,
  addTarget,
  newMission,
  updateMission
} = require('./missions');

const { updateResource } = require('./resources');
const { updateObjective } = require('./objectives');
const { updateTarget } = require('./targets');

// Routes
module.exports = router()
  .use(isAuthed)
  .all('/', async ctx => ctx.body = { message: 'Welcome to the v1 API'})

  .get('/users', getUsers)
  .get('/users/search', searchUsers)
  .get('/user/:id', getOneUser)
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

