import User from '../../../models/User'
import Snapshot from '../../../models/Snapshot'
import Task from '../../../models/Task'
import db from '../../../db'
import { formatSnapshot } from '../../../utils/graphql_helpers'

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
      return Snapshot.query()
        .where('objective_id', objective.id)
        .orderBy('created_at', 'desc')
        .select('*')
        .then(data => data.map(formatSnapshot))
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
