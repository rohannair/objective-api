// Deps
const router = require('koa-router');

// Controllers
const {
  login,
  forgotPassword,
  signup
} = require('./users');

module.exports = router()
  .all('/', async ctx => ctx.body = { message: 'Welcome!' })
  .post('/login', login)
  .post('/forgotpassword', forgotPassword)
  .post('/signup', signup)
  // TODO: need a create company API
  // .post('/createCompany', createCompany)
