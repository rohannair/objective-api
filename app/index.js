///////////// Deps /////////////
const Koa = require('koa');
const router = require('koa-router');
const co = require('co');
const debug = require('debug')('app:debug');

///////////// Configs /////////////
const ENV = process.env.NODE_ENV || 'development';

///////////// Middleware /////////////
const bodyparser = require('koa-bodyparser');
const errorResponder = require('./middleware/error-responder');

///////////// Routes /////////////
const healthCheckRouter = require('./routes/health-check/health-check.routes')
const v1Router = require('./routes/v1');

///////////// App /////////////
const app = module.exports = new Koa();
const api = router();

///////////// Middleware /////////////
app
  .use(bodyparser())
  .use(errorResponder);

///////////// Routing /////////////
api
  .all('/', ctx => ctx.body = 'Quartermaster API')
  .use('/health', healthCheckRouter.routes())
  .use('/v1', v1Router.routes());

app
  .use(api.routes())
  .use(api.allowedMethods());
