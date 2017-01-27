import Objective from '../../../models/Objective'
import { formattedObjective } from '../../../queries/objective'

const resolver = {
  Resource: {
    objective(resource) {
      let query = Objective.query()
        .where('id', resource.objective_id)
        .first()

      return formattedObjective(query)
    }
  }
}

export default resolver
