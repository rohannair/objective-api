import User from '../../../models/User'
import Snapshot from '../../../models/Snapshot'
import Task from '../../../models/Task'
import db from '../../../db'

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
    },

    tasks(objective) {
      return Task.query()
        .where('objective_id', objective.id)
    },
  }
}

export default resolver
