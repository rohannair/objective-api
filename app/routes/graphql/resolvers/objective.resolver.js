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

    tasks(objective, args) {
      const includeHidden = args.includeHidden ? true : false
      let query = Task.query()
        .andWhere('objective_id', objective.id)
        .orderBy('created_at', 'desc')

      if (!includeHidden) query = query.andWhere('hidden', false)

      return query
    },
  }
}

export default resolver
