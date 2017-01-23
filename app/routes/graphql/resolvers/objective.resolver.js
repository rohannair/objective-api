import Squad from '../../../models/Squad'
import User from '../../../models/User'
import KeyResult from '../../../models/KeyResult'
import Snapshot from '../../../models/Snapshot'
import Resource from '../../../models/Resource'

const resolver = {
  Objective: {
    owner(objective) {
      return User.query()
        .where('id', objective.ownerId)
        .first()
    },

    squad(objective) {
      return Squad.query()
        .where('id', objective.squadId)
        .first()
    },

    keyResults(objective) {
      return KeyResult.query()
        .where('objective_id', objective.id)
    },

    snapshots(objective) {
      return Snapshot.query()
        .where('objective_id', objective.id)
    },

    resources(objective) {
      return Resource.query()
        .where('objective_id', objective.id)
    }
  }
}

export default resolver
