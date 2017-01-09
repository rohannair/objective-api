import Company from '../../../models/Company'
import Squad from '../../../models/Squad'
import Objective from '../../../models/Objective'

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
      return Objective.query()
        .where('user_id', user.id)
    }
  }
}

export default resolver
