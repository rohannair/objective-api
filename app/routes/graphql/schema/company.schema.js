import User from './user.schema'
import Squad from './squad.schema'

const Company = `
  type Company {
    id: String!
    name: String
    domain: String

    user(id: String): User
    users: [User]
    squads: [Squad]
  }
`

export default () => [Company, User, Squad]
