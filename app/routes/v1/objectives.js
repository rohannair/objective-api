'use strict';
import Objective from '../../models/Objective';
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
      .insertWithRelated({
        ...addId({
          name: name,
          timeline: timeline,
          squad_id: squadId
        }),

        key_results: keyResults.map(v => ({ name: v })),
      })
      .returning('*');

    ctx.body = { mission }
  }

});

module.exports = objectiveControllers(Objective);
