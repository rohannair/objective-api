'use strict';
import Objective from '../../models/Objective';
import KeyResult from '../../models/KeyResult';
import CheckIn from '../../models/CheckIn';

import { addId } from '../../utils';

import chalk from 'chalk';
const debug = require('debug')('app:debug');

const objectiveControllers = Objective => ({
  create: async ctx => {
    const { body } = ctx.request;
    const { name, timeline, squadId, keyResults } = body;

    const mission = await Objective
      .query()
      .insertWithRelated(addId({
        name,
        timeline,
        squad_id: squadId,
        key_results: keyResults
      }))
      .returning('*');

    ctx.body = { mission };
  },

  update: async ctx => {
    const { body } = ctx.request;
    const { id, name, timeline, squadId, keyResults } = body;
    const updateMission = await Objective
      .query()
      .update({
        name,
        timeline
      })
      .where({ id });

    const missionKeyResults = keyResults.map(async kr => {
      let { id, name } = kr;
      return await KeyResult
        .query()
        .update({ name })
        .where({ id })
    });

    const mission = await Objective
      .query()
      .whereNull('user_id')
      .andWhere({ id })
      .eager('[key_results]')
      .first();

    ctx.body = {
      mission
    };
  }

});

module.exports = objectiveControllers(Objective);
