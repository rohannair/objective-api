import User from '../../../models/User';

import CompanyResolver from './company.resolver';
import ObjectiveResolver from './objective.resolver';
import SquadResolver from './squad.resolver';
import UserResolver from './user.resolver';

import MutationResolver from './mutation.resolver';

const QueryResolver = {
  Query: {
    viewer(root, args, ctx) {
      return User.query()
        .where('id', args.id)
        .first();
    }
  }
}

export default {
  ...QueryResolver,
  ...CompanyResolver,
  ...ObjectiveResolver,
  ...SquadResolver,
  ...UserResolver,

  // Mutation resolvers:
  ...MutationResolver
};
