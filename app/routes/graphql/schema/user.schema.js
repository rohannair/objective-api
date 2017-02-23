import Objective from './objective.schema'
import Company from './company.schema'
import Squad from './squad.schema'
import Snapshot from './snapshot.schema'

export const UserStatus = `
  enum UserStatus {
    # Regular user
    user,

    # Administrator
    admin,

    # Super Admin, IE an ObjectiveIQ user
    superuser
  }
`

const User = `
  type User {
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
    objectives: [Objective]
    snapshots: [Snapshot]
  }
`

export default () => [User, UserStatus, Company, Squad, Snapshot, Objective]
