import Company from '../../../models/Company'
import Squad from '../../../models/Squad'
import Objective from '../../../models/Objective'
import Snapshot from '../../../models/Snapshot'
import { formattedObjective } from '../../../queries/objectives'

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
    },

    snapshots(user) {
      return Snapshot.query()
        .where('user_id', user.id)
    }
  }
}

export default resolver
