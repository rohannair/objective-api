import Objective from './objective.schema';

const KeyResult = `
  type KeyResult {
    id: String!
    name: String
    status: String

    objective: Objective
  }
`;

export default () => [KeyResult, Objective];
