'use strict';

import Squad from '../../models/Squad';
import SquadUser from '../../models/SquadUser';

const squadControllers = Squad => ({

  get: async ctx => {
    const { company } = ctx.state;

    const results = await Squad
      .query()
      .where('company_id', company)
      .select(
        'id',
        'name',
        'created_at',
        'updated_at',
        'leader'
      )
      .orderBy('name')
      .eager('[objectives.[key_results], users.[objectives]]');

    ctx.body = {
      results
    }
  },

  assignUser: async ctx => {
    const { company } = ctx.state;
    const { squadId, userId } = ctx.request.body;

    const join = await SquadUser
      .query()
      .insert({
        squadId,
        userId
      });

    const results = await Squad
      .query()
      .where('company_id', company)
      .select(
        'id',
        'name',
        'created_at',
        'updated_at',
        'leader'
      )
      .orderBy('name')
      .eager('[objectives.[key_results], users.[objectives]]');

    ctx.body = {
      results
    };
  }

});

module.exports = squadControllers(Squad)
