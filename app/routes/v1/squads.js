'use strict';

import Squad from '../../models/Squad';

const squadControllers = Squad => ({

  getSquads: async ctx => {
    const { company } = ctx.state;

    const results = await Squad
      .query()
      .where('company_id', company)
      .select('id', 'name', 'creator', 'created_at', 'updated_at')
      .orderBy('name')
      .eager('[users.[missions.[targets, resources]], missions]')
      .filterEager('users', b =>
        b.select('users.id', 'users.first_name', 'users.last_name', 'users.img', 'users.job_title')
      );

    ctx.body = {
      results
    }
  }

});

module.exports = squadControllers(Squad)
