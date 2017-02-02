import User from './user.schema'
import Objective from './objective.schema'

const Collaborator = `
  type Collaborator {
    id: String!

    user: User!
    objective: Objective!
  }
`

export default () => [Collaborator, User, Objective]
