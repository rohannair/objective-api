const Mutation = `
  type Mutation {
    ###
    # Companies
    ###

    # Create a company
    createCompany(body: String!): Company

    # Edit a company
    editCompany(id: String!): Company

    ###
    # Users
    ###

    # Create an user
    createUser(body: String!): User

    # Invite an user
    inviteUser(email: String!): User

    # Update an user
    updateUser(id: String!): User

    # Delete an user
    deleteUser(id: String!): User

    ###
    # Squads
    ###

    # Create a squad
    createSquad(body: String!): Squad

    # Update a squad
    updateSquad(id: String!): Squad

    # Delete a squad
    deleteSquad(id: String!): Squad

    ###
    # Objectives
    ###

    # Create an Objective
    createObjective(body: String!): Objective

    # Update an Objective
    updateObjective(id: String!): Objective

    ###
    # Key Results
    ###

    # Create a key result
    createKeyResult(body: String!): KeyResult

    # Update a key result
    updateKeyResult(id: String!): KeyResult

    # Delete a key result
    deleteKeyResult(id: String!): KeyResult

    ###
    # Resources
    ###

    # Create a resource
    createResource(body: String!): Resource

    # Update a resource
    updateResource(id: Int!): Resource

    # Delete a resource
    deleteResource(id: Int!): Resource

    ###
    # SnapShots
    ###

    # Create a new SnapShots
    addSnapshot(body: String!, objective: String, blocker: Boolean): CheckIn
  }
`;

export default () => [Mutation];
