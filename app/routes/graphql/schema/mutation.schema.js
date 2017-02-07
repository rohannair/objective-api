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
    # Objectives
    ###

    # Create an Objective
    createObjective(name: String!, endsAt: Float): Objective

    # Update an Objective
    editObjective(id: String!, name: String, endsAt: Float, owner: String): Objective

    # Add a collaborator
    addCollaborator(user: String!, objective: String!) : Collaborator

    # Remove a collaborator
    deleteCollaborator(user: String!, objective: String!) : Collaborator

    ###
    # SnapShots
    ###

    # Create a new SnapShots
    addSnapshot(body: String!, objective: String, blocker: Boolean, img: String): Snapshot

    ###
    # Reactions
    ###

    # Add a reaction
    addReaction(reactionId: Int!, snapshotId: Int!): Reaction

    # Remove a reaction
    deleteReaction(reactionId: Int!, snapshotId: Int!): Reaction

    ###
    # Tasks
    ###

    # Create a task
    createTask(title: String!, isComplete: Boolean!, objective: String!): Task
  }
`

export default () => [Mutation]
