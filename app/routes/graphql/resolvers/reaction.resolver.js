import db from '../../../db'
import { queryFormattedSnapshot } from '../../../queries/snapshots'

/* eslint-disable no-unused-vars */
const debug = require('debug')('app:index')
/* eslint-enable no-unused-vars */

const resolver = {
  Reaction: {
    snapshot(reaction) {
      const query = db('snapshots')
        .where('id', reaction.snapshot_id)
        .first()

      return queryFormattedSnapshot(query)
    },

    user(reaction) {
      return db('users')
        .where('id', reaction.user_id)
        .first()
    }
  }
}

export default resolver
