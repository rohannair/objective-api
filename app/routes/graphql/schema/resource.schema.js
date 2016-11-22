import User from './user.schema';
import Objective from './objective.schema';

const Resource = `
  type Resource {
    id: Int!,
    name: String

    objective: Objective
  }
`;


export default () => [Resource, Objective];
