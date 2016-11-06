'use strict';

import Squad from '../../models/Squad';

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
        'updated_at'
      )
      .orderBy('name')
      .eager('[leader, objectives.[users, key_results]]');

    ctx.body = {
      results
    }
  }

});

module.exports = squadControllers(Squad)
