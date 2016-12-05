import User from './user.schema';
import KeyResult from './keyResult.schema';
import Squad from './squad.schema';
import CheckIn from './checkIn.schema';
import Resource from './resource.schema';

const Objective = `
  type Objective {
    id: String!
    name: String
    timeline: String
    status: String

    squad: Squad
    user: User
    keyResults: [KeyResult]
    checkIns: [CheckIn]
    resources: [Resource]
  }
`;

export default () => [
  CheckIn,
  KeyResult,
  Objective,
  Resource,
  Squad,
  User
];
