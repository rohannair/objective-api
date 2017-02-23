import Squad from '../../../models/Squad'
import User from '../../../models/User'

const resolver = {
  Company: {
    users(company) {
      return User.query()
        .where('company_id', company.id)
    },

    user(company, args) {
      if (!args.id) return null

      return User.query()
        .where('company_id', company.id)
        .andWhere('id', args.id)
        .first()
    },

    squads(company) {
      return Squad.query()
        .where('company_id', company.id)
    }
  }
}

export default resolver
