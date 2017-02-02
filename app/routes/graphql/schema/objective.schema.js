import User from './user.schema'
import Snapshot from './snapshot.schema'
import Collaborator from './collaborator.schema'

const Objective = `
  type Objective {
    id: String!
    name: String
    timeline: String
    status: String
    endsAt: Float

    owner: User
    collaborators: [Collaborator]
    snapshots: [Snapshot]
  }
`

export default () => [
  Snapshot,
  Objective,
  User,
  Collaborator
]
