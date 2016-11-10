'use strict';
require('dotenv').config({silent: true});

///////////// Deps /////////////
import Koa from 'koa';
import router from 'koa-router';
import chalk from 'chalk';
import co from 'co';
import Boom from 'boom';

import knex from 'knex';
import { Model } from 'objection';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import cors from 'koa-cors';

const keys = ['ineed', 'better', 'keys'];
const debug = require('debug')('app:index');

const db = knex(require('../knexfile'));
Model.knex(db);

///////////// Configs /////////////
const ENV = process.env.NODE_ENV || 'development';

///////////// Middleware /////////////
import bodyparser from 'koa-bodyparser';
import errorResponder from './middleware/error-responder';

///////////// Routes /////////////
import healthCheckRouter from './routes/health-check/health-check.routes';
import publicRouter from './routes/public';
import v1Router from './routes/v1';

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
