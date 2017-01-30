import UserResolver from './user.resolver'
import Snapshot from '../../../models/Snapshot'
import Squad from '../../../models/Squad'
import Objective from '../../../models/Objective'
import { formattedObjective } from '../../../queries/objective'

const resolver = {
  Viewer: {
    ...UserResolver.User,

    squads(viewer) {
      return Squad.query()
        .where('company_id', viewer.companyId)
    },

    objective(viewer, args) {
      if (!args.id) return null
      const query = Objective.query()
        .where('id', args.id)
        .andWhere('company_id', viewer.companyId)
        .first()
     
      return formattedObjective(query)
    },

    objectives(viewer) {
      const query = Objective.query()
        .where('company_id', viewer.companyId)
        .orderBy('updated_at', 'desc')

      return formattedObjective(query)
    },

    snapshots(viewer, args) {
      const { first, offset } = args
      return Snapshot.query()
        .where('company_id', viewer.companyId)
        .orderBy('created_at', 'desc')
        .offset(offset)
        .limit(first)
    },

    _snapshotsCount(viewer) {
      return  Snapshot.query()
        .where('company_id', viewer.companyId)
        .count('id')
        .then(data => data[0].count)
    }
  }
}

export default resolver
