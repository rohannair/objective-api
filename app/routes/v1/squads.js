'use strict';

import Squad from '../../models/Squad';
import User from '../../models/User';

import { addId } from '../../utils';

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
      .eager('[objectives.[key_results], users.[objectives.[key_results, resources, check_ins]]]')
      .filterEager('objectives', b => {
        b.whereNull('user_id');
      })
      .filterEager('users.objectives.check_ins', b => {
        b.orderBy('created_at', 'desc');
        b.limit(5);
      });

    ctx.body = {
      results
    };
  },

  create: async ctx => {
    const { company } = ctx.state;
    const { body } = ctx.request;

    const newSquad = await Squad
      .query()
      .insert({
        ...addId({
          ...body,
          company_id: company
        })
      })
      .returning('id');

    const squad = await Squad
      .query()
      .where('company_id', company)
      .andWhere('id', newSquad.id)
      .select(
        'id',
        'name',
        'created_at',
        'updated_at',
        'leader'
      )
      .eager('[objectives.[key_results], users.[objectives.[key_results, check_ins]]]')
      .filterEager('users.objectives.check_ins', b => {
        b.orderBy('created_at', 'desc');
        b.limit(3);
      })
      .first();

    ctx.status = 201;
    ctx.body = {
      squad
    };
  },

  assignUser: async ctx => {
    const { company } = ctx.state;
    const { squadId, userId } = ctx.request.body;

    await User
      .query()
      .update({
        squad_id: squadId
      })
      .where('id', userId)
      .andWhere('company_id', company);

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
      .eager('[objectives.[key_results], users.[objectives.[key_results, check_ins, resources]]]')
      .filterEager('objectives', b => {
        b.whereNull('user_id');
      })
      .filterEager('users.objectives.check_ins', b => {
        b.orderBy('created_at', 'desc');
        b.limit(5);
      });

    ctx.body = {
      results
    };
  }

});

module.exports = squadControllers(Squad);
