const {
  Mission,
  getMission,
  getAllMissions
} = require('../../models/Mission');

const { Resource } = require('../../models/Resource');
const Objective = require('../../models/Objective');
const Target = require('../../models/Target');

const MissionResource = require('../../models/MissionResource');
const MissionObjective = require('../../models/MissionObjective');
const MissionTarget = require('../../models/MissionTarget');

const { addId } = require('../../utils');

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
    const mission = await Mission
      .query()
      .update({ ...ctx.request.body })
      .where({ id })
      .returning('*');

    ctx.body = { mission }
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

    const newJoin = await MissionObjective
      .query()
      .insert({
        mission_id: id,
        objective_id: newObjective.id
      });

    ctx.status = 201;
    ctx.body = { inserted: newObjective };
  },

  addTarget: async ctx => {
    const { id } = ctx.params;
    const target = addId({ name: '', keyResults: [] });
    const newTarget = await Target
      .query()
      .insert(target)
      .returning('*');

    const newJoin = await MissionTarget
      .query()
      .insert({
        mission_id: id,
        target_id: newTarget.id
      });

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
  }

});

module.exports = missionControllers(Mission);
