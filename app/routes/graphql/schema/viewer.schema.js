import Objective from './objective.schema'
import Company from './company.schema'
import Squad from './squad.schema'
import Snapshot from './snapshot.schema'
import { UserStatus } from './user.schema'

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
    objective(id: String): Objective,
    snapshots: [Snapshot]
  }
`

export default () => [Viewer, UserStatus, Company, Squad, Objective, Snapshot]
