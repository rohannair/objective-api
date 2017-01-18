'use strict'

import Snapshot from '../../models/Snapshot'

import { getImageUrl } from '../../utils/paparazzi'

/* eslint-disable no-unused-vars */
import chalk from 'chalk'
const debug = require('debug')('app:debug')
/* eslint-enable no-unused-vars */

const snapshotControllers = () => ({
  create: async ctx => {
    const { company, user } = ctx.state
    const { body: { body, objective, screenshot: img }} = ctx.request

    try {
      // Pass img to paparazzi service
      const imageUrl = await getImageUrl(img)

      // Create image
      const snapshot = await Snapshot
        .query()
        .insert({
          body,
          objective_id: objective,
          company_id: company,
          user_id: user,
          img: imageUrl
        })
        .returning('*')

      ctx.body = { snapshot }
    } catch (e) {
      ctx.throw(422, e)
    }
  }

})

module.exports = snapshotControllers()
