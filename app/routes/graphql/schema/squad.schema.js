import User from './user.schema';
import Objective from './objective.schema';
import Company from './company.schema';

const Squad = `
  type Squad {
    id: String!
    name: String

    company: Company
    users: [User]
    leader: User
    objectives: [Objective]
  }
`;

export default () => [Squad, Company, User, Objective]
