import db from '../../../db'

const resolver = {
  Objective: {
    collaborators(objective) {
      return db('objectives_users')
        .where('objective_id', objective.id)
    },

    owner(objective) {
      return db('users')
        .where('id', objective.ownerId)[0]
    },

    snapshots(objective) {
      return db('snapshots')
        .where('objective_id', objective.id)
    },
  }
}

export default resolver
