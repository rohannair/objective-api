import User from './user.schema'
import KeyResult from './keyResult.schema'
import Squad from './squad.schema'
import Snapshot from './snapshot.schema'
import Resource from './resource.schema'

const Objective = `
  type Objective {
    id: String!
    name: String
    timeline: String
    status: String
    endsAt: String

    squad: Squad
    user: User
    keyResults: [KeyResult]
    snapshots: [Snapshot]
    resources: [Resource]
  }
`

export default () => [
  Snapshot,
  KeyResult,
  Objective,
  Resource,
  Squad,
  User
]
