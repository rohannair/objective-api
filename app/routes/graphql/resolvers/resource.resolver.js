import Objective from '../../../models/Objective'
import { formattedObjective } from '../../../queries/objectives'

const resolver = {
  Resource: {
    objective(resource) {
      const query = Objective.query()
        .where('id', resource.objective_id)
        .first()

      return formattedObjective(query)
    }
  }
}

export default resolver
