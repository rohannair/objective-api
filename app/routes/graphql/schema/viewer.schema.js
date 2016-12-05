import Objective from './objective.schema';
import Company from './company.schema';
import Squad from './squad.schema';
import CheckIn from './checkIn.schema';
import { UserStatus } from './user.schema';

const Viewer = `
  type Viewer {
    id: String!
    email: String!
    firstName: String
    lastName: String
    img: String
    role: UserStatus
    jobTitle: String
    pending: Boolean

    company: Company,
    squads: [Squad],
    objectives: [Objective],
    snapshots: [CheckIn]
  }
`;

export default () => [Viewer, UserStatus, Company, Squad, Objective, CheckIn];
