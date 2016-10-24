// Deps
const router = require('koa-router');

// Controllers
const {
  login
} = require('./users');

module.exports = router()
  .post('/login', login)
