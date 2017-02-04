import UserResolver from './user.resolver'
import Snapshot from '../../../models/Snapshot'
import Squad from '../../../models/Squad'
import Objective from '../../../models/Objective'

import { formattedObjective, viewableObjectives, viewableObjectivesWithQuery } from '../../../queries/objectives'

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
      const filteredObjectives = viewableObjectives(viewer)
        .orderBy('updated_at', 'desc')

      return formattedObjective(filteredObjectives)
    },

    snapshots(viewer, args) {
      const { first, offset } = args

      const query = Snapshot.query()
        .orWhere('snapshots.company_id', viewer.companyId)
        .orderBy('snapshots.created_at', 'desc')
        .offset(offset)
        .limit(first)
        .select('snapshots.id', 'snapshots.name', 'snapshots.body', 'blocker', 'completed', 'snapshots.created_at', 'img', 'snapshots.company_id', 'snapshots.objective_id', 'snapshots.user_id')

      return viewableObjectivesWithQuery(query, viewer)
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
