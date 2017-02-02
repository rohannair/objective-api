import User from '../../../models/User'
import Objective from '../../../models/Objective'

const resolver = {
  Collaborator: {
    user(collaborator) {
      return User.query()
        .where('id', collaborator.user_id)
        .first()
    },

    objective(collaborator) {
      return Objective.query()
        .where('id', collaborator.objective_id)
        .first()
    }
  }
}

export default resolver
