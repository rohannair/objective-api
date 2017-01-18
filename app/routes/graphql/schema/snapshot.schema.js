import Company from './company.schema'
import Objective from './objective.schema'
import Reaction from './reaction.schema'
import User from './user.schema'

const Snapshot = `
  type Snapshot {
    id: Int!
    name: String
    body: String
    blocker: Boolean
    completed: Boolean
    createdAt: String
    img: String

    company: Company
    objective: Objective
    user: User
    reactions: [Reaction]
  }
`

export default () => [Snapshot, Company, Objective, Reaction, User]
