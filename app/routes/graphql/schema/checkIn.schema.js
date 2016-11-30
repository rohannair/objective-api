import User from './user.schema';
import Objective from './objective.schema';
import Company from './company.schema';

const CheckIn = `
  type CheckIn {
    id: Int!
    name: String
    body: String
    completed: Boolean
    createdAt: String

    company: Company
    objective: Objective
    user: User
  }
`;

export default () => [CheckIn, Company, Objective, User];
