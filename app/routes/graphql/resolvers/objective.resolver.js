import User from '../../../models/User'
import Snapshot from '../../../models/Snapshot'
import Task from '../../../models/Task'
import db from '../../../db'
import { queryFormattedSnapshot } from '../../../queries/snapshots'

const resolver = {
  Objective: {
    collaborators(objective) {
      return db('objectives_users')
        .where('objective_id', objective.id)
    },

    owner(objective) {
      return User.query()
        .where('id', objective.ownerId)
        .first()
    },

    snapshots(objective) {
      const query = Snapshot.query()
        .where('objective_id', objective.id)
        .orderBy('created_at', 'desc')

      return queryFormattedSnapshot(query)
    },

    tasks(objective) {
      return Task.query()
        .andWhere('objective_id', objective.id)
        .orderBy('created_at', 'desc')
        .andWhere('hidden', false)
    },
  }
}

export default resolver
