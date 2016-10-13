const { Model } = require('objection');
const { addId } = require('../utils');

const BaseModel = require('./Base');
const Objective = require('./Objective');
const {Resource} = require('./Resource');
const {CheckIn} = require('./CheckIn');
const Target = require('./Target');
const User = require('./User');

const Mission_Objective = require('./MissionObjective');
const Mission_Resource = require('./MissionResource');
const Mission_Target = require('./MissionTarget');
const Mission_User = require('./MissionUser');

class Mission extends BaseModel {
  static get tableName() {
    return 'missions';
  }

  $beforeUpdate() {
    this.updated_at = new Date().toUTCString();
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'missions.id',
          through: {
            from: 'missions_users.mission_id',
            to: 'missions_users.user_id'
          },
          to: 'users.id'
        }
      },

      resources: {
        relation: Model.ManyToManyRelation,
        modelClass: Resource,
        join: {
          from: 'missions.id',
          through: {
            from: 'missions_resources.mission_id',
            to: 'missions_resources.resource_id'
          },
          to: 'resources.id'
        }
      },

      targets: {
        relation: Model.ManyToManyRelation,
        modelClass: Target,
        join: {
          from: 'missions.id',
          through: {
            from: 'missions_targets.mission_id',
            to: 'missions_targets.target_id'
          },
          to: 'targets.id'
        }
      },

      objectives: {
        relation: Model.ManyToManyRelation,
        modelClass: Objective,
        join: {
          from: 'missions.id',
          through: {
            from: 'missions_objectives.mission_id',
            to: 'missions_objectives.objective_id'
          },
          to: 'objectives.id'
        }
      },

      checkIns: {
        relation: Model.HasManyRelation,
        modelClass: CheckIn,
        join: {
          from: 'check_ins.mission_id',
          to: 'missions.id'
        }
      }
    }
  }
}

const getAllMissions = (limit = 10, offset = 0) =>
  Mission
    .query()
    .select('id', 'name', 'description', 'duration', 'status')
    .limit(limit)
    .offset(offset)
    .eager('[resources, objectives, targets, users, checkIns]')
    .filterEager('resources', b =>
      b.select('resources.id', 'resources.name'))
    .filterEager('targets', b =>
      b.select('targets.id', 'targets.objective', 'targets.key_results'))
    .filterEager('objectives', b =>
      b.select('objectives.id', 'objectives.name', 'objectives.completed'))
    .filterEager('users', b =>
      b.select('users.id', 'email', 'first_name', 'last_name', 'role', 'img'))
    .orderBy('missions.updated_at');

const getMission = id =>
  Mission
    .query()
    .select('id', 'name', 'description', 'duration', 'status')
    .where({ id })
    .eager('[resources, objectives, targets, users]')
    .filterEager('resources', b =>
      b.select('resources.id', 'resources.name'))
    .filterEager('targets', b =>
      b.select('targets.id', 'targets.objective', 'targets.key_results'))
    .filterEager('objectives', b =>
      b.select('objectives.id', 'objectives.name', 'objectives.completed'))
    .filterEager('users', b =>
      b.select('users.id', 'email', 'first_name', 'last_name', 'role', 'img'))
    .first();

const putMission = mission =>
  Mission
    .query()
    .insertWithRelated([
      {
        ...addId(mission),
        status: mission.status || 'draft',
        resources: mission.resources.map(addId),
        objectives: mission.objectives.map(addId),
        targets: mission.targets.map(addId)
      }
    ]);

module.exports = {
  Mission,
  getMission,
  getAllMissions
};
