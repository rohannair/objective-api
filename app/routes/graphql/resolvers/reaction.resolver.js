import db from '../../../db'
import { formatSnapshot } from '../../../utils/graphql_helpers'

/* eslint-disable no-unused-vars */
const debug = require('debug')('app:index')
/* eslint-enable no-unused-vars */

const resolver = {
  Reaction: {
    snapshot(reaction) {
      return db('snapshots')
        .where('id', reaction.snapshot_id)
        .first()
        .select('*')
        .then(data => data.map(formatSnapshot))
    },

    user(reaction) {
      return db('users')
        .where('id', reaction.user_id)
        .first()
    }
  }
}

export default resolver
