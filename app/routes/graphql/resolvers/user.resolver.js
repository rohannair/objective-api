import Company from '../../../models/Company'
import Squad from '../../../models/Squad'
import Objective from '../../../models/Objective'
import { formattedObjective } from '../../../queries/objective'

const resolver = {
  User: {
    company(user) {
      return Company.query()
        .where('id', user.companyId)
        .first()
    },

    squads(user) {
      return Squad.query()
        .where('id', user.squadId)
    },

    objectives(user) {
      const query = Objective.query()
        .where('user_id', user.id)

      return formattedObjective(query)
    }
  }
}

export default resolver
