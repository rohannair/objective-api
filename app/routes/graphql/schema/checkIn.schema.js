import User from './user.schema';
import Objective from './objective.schema';

const CheckIn = `
  type CheckIn {
    id: Int!
    name: String
    completed: Boolean

    objective: Objective
    user: User
  }
`;

export default () => [CheckIn, Objective, User];
