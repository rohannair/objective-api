import { Model } from 'objection';
import { addId } from '../utils';

import BaseModel from './Base';
import Objective from './Objective';
import Resource from './Resource';
import CheckIn from './CheckIn';
import Target from './Target';
// import User from './User';

import Mission_Objective from './MissionObjective';
import Mission_Resource from './MissionResource';
import Mission_Target from './MissionTarget';
import Mission_User from './MissionUser';

class Mission extends BaseModel {
  static tableName = 'missions';

  $beforeUpdate() {
    this.updated_at = new Date().toUTCString();
  }

  static get relationMappings() {
    return {
      // users: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: User,
      //   join: {
      //     from: 'missions.id',
      //     through: {
      //       from: 'missions_users.mission_id',
      //       to: 'missions_users.user_id'
      //     },
      //     to: 'users.id'
      //   }
      // },

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

export default Mission;

/// Queries
export const getAllMissions = (limit = 10, offset = 0) =>
  Mission
    .query()
    .select('id', 'name', 'description', 'duration', 'status', 'end_at')
    .limit(limit)
    .offset(offset)
    .eager('[resources, objectives, targets, checkIns]')
    .filterEager('resources', b =>
      b.select('resources.id', 'resources.name'))
    .filterEager('targets', b =>
      b.select('targets.id', 'targets.objective', 'targets.key_results'))
    .filterEager('objectives', b =>
      b.select('objectives.id', 'objectives.name', 'objectives.completed'))
    .filterEager('checkIns', b =>
        b.orderBy('created_at').limit(5)
      )
    .orderBy('missions.updated_at');

export const getMission = id =>
  Mission
    .query()
    .select('id', 'name', 'description', 'duration', 'status', 'end_at')
    .where({ id })
    .eager('[resources, objectives, targets]')
    .filterEager('resources', b =>
      b.select('resources.id', 'resources.name'))
    .filterEager('targets', b =>
      b.select('targets.id', 'targets.objective', 'targets.key_results'))
    .filterEager('objectives', b =>
      b.select('objectives.id', 'objectives.name', 'objectives.completed'))
    .first();

export const putMission = mission =>
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

