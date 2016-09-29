const router = require('koa-router');

module.exports = router()
  .all('/', async (ctx) => {
    ctx.body = {
      message: 'Welcome to the v1 API'
    }
  })
