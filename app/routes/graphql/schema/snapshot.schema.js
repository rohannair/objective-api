import User from './user.schema'
import Objective from './objective.schema'
import Company from './company.schema'

const Snapshot = `
  type Snapshot {
    id: Int!
    name: String
    body: String
    blocker: Boolean
    completed: Boolean
    createdAt: String

    company: Company
    objective: Objective
    user: User
  }
`

export default () => [Snapshot, Company, Objective, User]
