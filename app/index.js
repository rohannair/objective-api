'use strict'
require('dotenv').config({silent: true})

///////////// Deps /////////////
import Koa from 'koa'
import router from 'koa-router'
import Boom from 'boom'
import logger from 'koa-logger'

import convert from 'koa-convert'
import helmet from 'koa-helmet'
import cors from 'koa-cors'

import db from './db'

///////////// Middleware /////////////
import bodyparser from 'koa-bodyparser'
import errorResponder from './middleware/error-responder'
import knexLogger from './middleware/knex-logger'

///////////// Routes /////////////
import healthCheckRouter from './routes/health-check/health-check.routes'
import publicRouter from './routes/public'
import v1Router from './routes/v1'
import privateRouter from './routes/private'
import graphql from './routes/graphql'

///////////// App /////////////
const app = module.exports = new Koa()
const api = router()

///////////// Middleware /////////////
app.keys = ['ineed', 'better', 'keys']
app.proxy = true
app
  .use(helmet())
  .use(convert(cors()))
  .use(bodyparser())
  .use(logger())
  .use(knexLogger(db))
  .use(errorResponder)

///////////// Routing /////////////
api
  .all('/', ctx => ctx.body = 'Quartermaster API')
  .use('/health', healthCheckRouter.routes())
  .use('/public', publicRouter.routes())
  .use('/v1', v1Router.routes())
  .use('/45798909507319174', privateRouter.routes())
  .use('/graphql', graphql.routes())

app
  .use(api.routes())
  .use(api.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
  }))
