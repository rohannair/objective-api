'use strict';
import Mission, {
  getMission,
  getAllMissions
} from '../../models/Mission';

import Resource from '../../models/Resource';
import Objective from '../../models/Objective';
import Mission_Squad from '../../models/MissionSquad';

import { addId } from '../../utils';
import snakeCase from 'lodash/snakeCase';

const missionControllers = Mission => ({
  getMissions: async ctx => {
    const { limit, offset } = ctx.query;
    ctx.body = {
      missions: await getAllMissions(limit, offset)
    }
  },

  getOneMission: async ctx => {
    const { id } = ctx.params;
    const mission = await getMission(id);

    ctx.body = {
      mission
    };
  },

  updateMission: async ctx => {
    const { id } = ctx.params;
    const { field } = ctx.query;

    const mission = await Mission
      .query()
      .update({ ...ctx.request.body })
      .where({ id })
      .returning(snakeCase(field));

    ctx.body = { updated: mission }
  },

  addResource: async ctx => {
    const { id } = ctx.params;
    const resource = addId(ctx.request.body.resource);

    const newResource = await Resource
      .query()
      .insert(resource);

    const newJoin = await MissionResource
      .query()
      .insert({
        mission_id: id,
        resource_id: newResource.id
      });

    ctx.status = 201;
    ctx.body = { inserted: newResource }
  },

  addObjective: async ctx => {
    const { id } = ctx.params;
    const objective = addId({ name: '' });
    const newObjective = await Objective
      .query()
      .insert(objective)
      .returning('*');

    ctx.status = 201;
    ctx.body = { inserted: newObjective };
  },

  addTarget: async ctx => {
    const { id } = ctx.params;
    const target = addId({ objective: '', keyResults: [] });
    const newTarget = await Target
      .query()
      .insert(target)
      .returning('*');

      ctx.status = 201;
      ctx.body = { inserted: newTarget };
  },

  newMission: async ctx => {
    const newMission = await Mission
      .query()
      .insertWithRelated({
        ...addId({name: '', description: '', duration: ''}),
        resources: [
          { ...addId({ name: '' }) }
        ],
        objectives: [
          { ...addId({ name: '' }) }
        ],
        targets: [
          { ...addId({ objective: '', keyResults: [] }) }
        ]
      });

    const mission = await getMission(newMission.id);

    ctx.status = 201;
    ctx.body = { mission };
  },

  createMission: async ctx => {
    const data = ctx.request.body;
    // {
    //   "data": {
    //     "objective": "a",
    //     "keyResults": [
    //       "b"
    //     ],
    //     "timeline": "c"
    //   }
    // }
    //
    //

    const newMission = await Mission
      .query()
      .insertWithRelated({
        ...addId({
          name: data.objective,
          duration: data.timeline
        }),

        key_results: data.keyResults.map(v => ({ name: v })),
      })
      .returning('*');

    const missionSquadJoin = await Mission_Squad()
      .query()
      .insert({
        squad_id: data.squadId,
        mission_id: newMission.id
      });

    const mission = await getMission(newMission.id);
    ctx.body = { mission }
  }

});

module.exports = missionControllers(Mission);
