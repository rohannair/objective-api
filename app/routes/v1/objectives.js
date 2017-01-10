'use strict'

import Objective from '../../models/Objective'
import KeyResult from '../../models/KeyResult'

import { addId } from '../../utils'

/* eslint-disable no-unused-vars */
import chalk from 'chalk'
const debug = require('debug')('app:debug')
/* eslint-enable no-unused-vars */

const objectiveControllers = Objective => ({
  get: async ctx => {
    const { company } = ctx.state

    const objectives = await Objective
      .query()
      .where({
        company_id: company
      })
      .orderBy('created_at', 'desc')

    ctx.body = { objectives }
  },

  create: async ctx => {
    const { company } = ctx.state
    const { body } = ctx.request
    const { name, timeline, squadId, keyResults } = body

    const mission = await Objective
      .query()
      .insertWithRelated(addId({
        name,
        timeline,
        squad_id: squadId,
        key_results: keyResults,
        company_id: company
      }))
      .returning('*')

    ctx.body = { mission }
  },

  update: async ctx => {
    const { body } = ctx.request
    const { id, name, timeline, keyResults } = body

    await Objective
      .query()
      .update({
        name,
        timeline
      })
      .where({ id })

    /* eslint-disable no-unused-vars */
    const missionKeyResults = keyResults.map(async kr => {
      let { id, name } = kr
      return await KeyResult
        .query()
        .update({ name })
        .where({ id })
    })
    /* eslint-emable no-unused-vars */

    const mission = await Objective
      .query()
      .whereNull('user_id')
      .andWhere({ id })
      .eager('[key_results]')
      .first()

    ctx.body = {
      mission
    }
  }

})

module.exports = objectiveControllers(Objective)
