import User from './user.schema';
import Objective from './objective.schema';

const KeyResult = `
  type KeyResult {
    id: Int!,
    name: String

    objective: Objective
  }
`;

export default KeyResult;
