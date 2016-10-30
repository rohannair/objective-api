'use strict';

///////////// Deps /////////////
const Koa = require('koa');
const router = require('koa-router');
const chalk = require('chalk');
const co = require('co');
const debug = require('debug')('app:index');
const Boom = require('boom');

const knex = require('knex');
const { Model } = require('objection');
const convert = require('koa-convert');
const helmet = require('koa-helmet');
const cors = require('koa-cors');

const keys = ['ineed', 'better', 'keys'];

const db = knex(require('../knexfile'));
Model.knex(db);

///////////// Configs /////////////
const ENV = process.env.NODE_ENV || 'development';

///////////// Middleware /////////////
const bodyparser = require('koa-bodyparser');
const errorResponder = require('./middleware/error-responder');

///////////// Routes /////////////
const healthCheckRouter = require('./routes/health-check/health-check.routes');
const publicRouter = require('./routes/public');
const v1Router = require('./routes/v1');

///////////// App /////////////
const app = module.exports = new Koa();
const api = router();

///////////// Middleware /////////////
app.keys = ['ineed', 'better', 'keys'];
app.proxy = true;
app
  .use(helmet())
  .use(convert(cors()))
  .use(bodyparser())
  .use(errorResponder);

///////////// Routing /////////////
api
  .all('/', ctx => ctx.body = 'Quartermaster API')
  .use('/health', healthCheckRouter.routes())
  .use('/public', publicRouter.routes())
  .use('/v1', v1Router.routes());

app
  .use(api.routes())
  .use(api.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
  }));
