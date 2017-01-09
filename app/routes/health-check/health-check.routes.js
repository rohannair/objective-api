'use strict'
import router from 'koa-router'
import { shallow, deep } from './health-check.controller'

module.exports = router()
  .get('/shallow', shallow)
  .get('/deep', deep)
