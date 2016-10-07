// Deps
const router = require('koa-router');

// Controllers
const {
  login,
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
  newMission
} = require('./missions');

const { updateResource } = require('./resources');
const { updateObjective } = require('./objectives');
const { updateTarget } = require('./targets');

// Routes
module.exports = router()
  .all('/', async ctx => ctx.body = { message: 'Welcome to the v1 API'})

  .get('/users', getUsers)
  .get('/users/search', searchUsers)
  .get('/user/:id', getOneUser)
  .post('/user/:id', updateUser)
  .post('/login', login)

  .get('/missions', getMissions)
  .get('/missions/new', newMission)
  .get('/missions/:id', getOneMission)

  .get('/missions/:id/resources/add', addResource)
  .post('/missions/:id/resources/:resourceId', updateResource)

  .get('/missions/:id/objectives/add', addObjective)
  .post('/missions/:id/objectives/:objectiveId', updateObjective)

  .get('/missions/:id/targets/add', addTarget)
  .post('/missions/:id/targets/:targetId', updateTarget)

