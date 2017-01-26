import User from './user.schema'
import Snapshot from './snapshot.schema'

const Objective = `
  type Objective {
    id: String!
    name: String
    timeline: String
    status: String
    targetEndsAt: Float

    owner: User
    collaborators: [User]
    snapshots: [Snapshot]
  }
`

export default () => [
  Snapshot,
  Objective,
  User
]
