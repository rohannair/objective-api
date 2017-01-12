import Snapshot from './snapshot.schema'
import User from './user.schema'

const Reaction = `
  type Reaction {
    id: Int!
    name: String
    created_at: String

    snapshot: Snapshot
    user: User
  }
`
export default () => [Reaction, Snapshot, User]
