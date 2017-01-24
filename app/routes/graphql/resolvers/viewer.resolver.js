import UserResolver from './user.resolver'
import Snapshot from '../../../models/Snapshot'
import Squad from '../../../models/Squad'
import Objective from '../../../models/Objective'

const resolver = {
  Viewer: {
    ...UserResolver.User,

    squads(viewer) {
      return Squad.query()
        .where('company_id', viewer.companyId)
    },

    objective(viewer, args) {
      if (!args.id) return null
      return Objective.query()
        .where('id', args.id)
        .andWhere('company_id', viewer.companyId)
        .first()
    },

    objectives(viewer) {
      return Objective.query()
        .where('company_id', viewer.companyId)
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
