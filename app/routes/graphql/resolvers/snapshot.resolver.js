import User from '../../../models/User'
import Objective from '../../../models/Objective'

const resolver = {
  Snapshot : {
    user(snapshot) {
      return User.query()
        .where('id', snapshot.userId)
        .first()
    },

    objective(snapshot) {
      return Objective.query()
        .where('id', snapshot.objectiveId)
        .first()
    },
  }
}

export default resolver
