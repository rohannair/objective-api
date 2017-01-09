import Objective from '../../../models/Objective'

const resolver = {
  Resource: {
    objective(resource) {
      return Objective.query()
        .where('id', resource.objective_id)
        .first()
    }
  }
}

export default resolver
