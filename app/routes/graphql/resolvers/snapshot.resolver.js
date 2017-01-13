import db from '../../../db'
import User from '../../../models/User'
import Objective from '../../../models/Objective'

/* eslint-disable no-unused-vars */
const debug = require('debug')('app:debug')

const resolver = {
  Snapshot : {
    user(snapshot) {
      return User.query()
        .where('id', snapshot.userId)
        .first()
    },

    objective(snapshot) {
      return Objective.query()
        .where('id', snapshot.objectiveId)
        .first()
    },

    reactions(snapshot) {
      return db('reactions_snapshots')
        .where({ 'reactions_snapshots.snapshot_id': snapshot.id })
        .join('reactions', 'reactions_snapshots.reaction_id', '=', 'reactions.id')
        .select('reactions_snapshots.*', 'reactions.name')
    }
  }
}

export default resolver
