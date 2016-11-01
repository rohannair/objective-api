'use strict';
const router = require('koa-router');
const { shallow, deep } = require('./health-check.controller');

module.exports = router()
  .get('/shallow', shallow)
  .get('/deep', deep);
