import User from '../../../models/User';

import CheckinResolver from './checkIn.resolver';
import CompanyResolver from './company.resolver';
import ObjectiveResolver from './objective.resolver';
import SquadResolver from './squad.resolver';
import UserResolver from './user.resolver';
import ViewerResolver from './viewer.resolver';

import MutationResolver from './mutation.resolver';

const debug = require('debug')('app:index');

const QueryResolver = {
  Query: {
    viewer(root, args, ctx) {
      debug(JSON.stringify(ctx.state), null, 4);
      return User.query()
        .where('id', ctx.state.user)
        .first();
    }
  }
};

export default {
  ...QueryResolver,
  ...ViewerResolver,
  ...CheckinResolver,
  ...CompanyResolver,
  ...ObjectiveResolver,
  ...SquadResolver,
  ...UserResolver,

  // Mutation resolvers:
  ...MutationResolver
};
