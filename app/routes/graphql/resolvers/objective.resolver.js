import User from '../../../models/User'
import Snapshot from '../../../models/Snapshot'

const resolver = {
  Objective: {
    collaborators(objective) {
      return User.query()
        .leftJoin('objectives_users', 'users.id', 'objectives_users.user_id')
        .where('objectives_users.objective_id', objective.id)
        .select('users.id', 'users.first_name', 'users.last_name', 'users.img')
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
  }
}

export default resolver
