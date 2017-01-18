'use strict'

import Snapshot from '../../models/Snapshot'

/* eslint-disable no-unused-vars */
import chalk from 'chalk'
const debug = require('debug')('app:debug')
/* eslint-enable no-unused-vars */

const snapshotControllers = () => ({
  create: async ctx => {
    const { company, user } = ctx.state
    const { body: { body, objective, screenshot: img }} = ctx.request

    // TODO: Pass img to paparazzi service
    debug('\n')
    debug('IMAGE EXISTS...', img.length)
    debug('\n')

    // Create image
    const snapshot = await Snapshot
      .query()
      .insert({
        body,
        objective_id: objective,
        company_id: company,
        user_id: user
      })
      .returning('*')

    ctx.body = { snapshot }
  }

})

module.exports = snapshotControllers()
