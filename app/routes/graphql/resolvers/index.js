import User from '../../../models/User'

import SnapshotResolver from './snapshot.resolver'
import CompanyResolver from './company.resolver'
import ObjectiveResolver from './objective.resolver'
import ReactionResolver from './reaction.resolver'
import SquadResolver from './squad.resolver'
import UserResolver from './user.resolver'
import ViewerResolver from './viewer.resolver'
import CollaboratorResolver from './collaborator.resolver'

import MutationResolver from './mutation.resolver'

/* eslint-disable no-unused-vars */
const debug = require('debug')('app:index')
/* eslint-enable no-unused-vars */

const QueryResolver = {
  Query: {
    viewer(root, args, ctx) {
      return User.query()
        .where('id', ctx.state.user)
        .first()
    }
  }
}

export default {
  ...QueryResolver,
  ...ViewerResolver,
  ...SnapshotResolver,
  ...CompanyResolver,
  ...ObjectiveResolver,
  ...ReactionResolver,
  ...SquadResolver,
  ...UserResolver,
  ...CollaboratorResolver,

  // Mutation resolvers:
  ...MutationResolver
}
