import db from '../../../db'

import models from '../../../models'
import { addId, createRandomToken } from '../../../utils'
import { randomPassword, encryptPassword } from '../../../utils/encryption'

import * as emails from '../../v1/emails'
/* eslint-disable no-unused-vars */
const debug = require('debug')('app:debug')

const resolver = {
  Mutation: {
    /***
     * Companies
     ***/

    // Create a company
    createCompany: async (root, args, ctx) => {

    },

    // Edit a company
    editCompany: async (root, args, ctx) => {

    },

    /***
     * Users
     ***/

    // Create an user
    createUser: async (root, args, ctx) => {

    },

    // Invite an user
    inviteUser: async (root, args, ctx) => {
      const { email } = args
      const { company, user: adminId } = ctx.state

      // Insert user
      const signupToken = await createRandomToken()
      const user = await models.User.query()
        .insert(addId({
          email: email.toLowerCase(),
          company_id: company,
          signup_token: signupToken,
          digest: await randomPassword().then(encryptPassword)
        }))
        .returning('*')

      // Pull inviter data
      const admin = await models.User.query()
        .where({ 'users.id': adminId })
        .select(['users.first_name', 'users.last_name', 'users.email', 'c.name as companyName', 'c.domain'])
        .leftJoin('companies as c', 'users.company_id', 'c.id')
        .first()

      // Send email invite
      const emailResult = await emails.inviteUser({
        email: email.toLowerCase(),
        signupToken,
        admin: {
          name: `${admin.firstName} ${admin.lastName}`,
          email: admin.email
        },
        company: admin.companyName,
        domain: admin.domain.split('.')[0]
      })

      // resolve inviteUser
      return user
    },

    // Update an user
    updateUser: async (root, args, ctx) => {

    },

    // Delete an user
    deleteUser: async (root, args, ctx) => {

    },

    /***
     * Squads
     ***/

    // Create a squad
    createSquad: async (root, args, ctx) => {

    },

    // Update a squad
    updateSquad: async (root, args, ctx) => {

    },

    // Delete a squad
    deleteSquad: async (root, args, ctx) => {

    },

    /***
     * Objectives
     ***/

    // Create an Objective
    createObjective: async (root, args, ctx) => {
      const { name } = args
      const { endsAt } = ctx.request.body.variables
      const { company, user: adminId } = ctx.state
      const objective = await models.Objective.query()
        .insert(addId({
          name,
          endsAt,
          companyId: company
        }))
        .returning('*')

      return objective
    },

    // Update an objective
    editObjective: async (root, args, ctx) => {
      const { id, name } = args
      const { endsAt } = ctx.request.body.variables
      const { company, user: adminId } = ctx.state

      const objective = await models.Objective.query()
        .update(addId({
          name,
          endsAt
        }))
        .where({
          id,
          company_id: company
        })
        .returning('*')
        .first()


      return objective
    },

    /***
     * Key Results
     ***/

    // Create a key result
    createKeyResult: async (root, args, ctx) => {

    },

    // Update a key result
    updateKeyResult: async (root, args, ctx) => {

    },

    // Delete a key result
    deleteKeyResult: async (root, args, ctx) => {

    },

    /***
     * Resources
     ***/

    // Create a resource
    createResource: async (root, args, ctx) => {

    },

    // Update a resource
    updateResource: async (root, args, ctx) => {

    },

    // Delete a resource
    deleteResource: async (root, args, ctx) => {

    },

    /// Create a new snapshot
    // addSnapshot(body: String!, objective: String): Snapshot
    addSnapshot: async (root, args, ctx) => {
      const { body, objective, blocker, img } = args
      const { company, user: userId } = ctx.state

      // TODO: Pass img to paparazzi service
      debug('\n')
      debug('IMAGE EXISTS...', img.length)
      debug('\n')

      const snapshot = await models.Snapshot.query()
        .insert({
          body,
          blocker,
          objective_id: objective,
          company_id: company,
          user_id: userId
        })
        .returning('*')

      return snapshot
    },

    // Add a reaction
    // (reactionId: Int!, snapshotId: Int!): Reaction
    addReaction: async(root, args, ctx) => {
      const { reactionId, snapshotId } = args
      const { user: userId } = ctx.state

      // TODO: allow changing reaction type
      const reaction = await db('reactions_snapshots')
        .insert({
          user_id: userId,
          reaction_id: reactionId,
          snapshot_id: snapshotId
        })
        .returning('*')

      return reaction[0]
    },

    // Remove a reaction
    // (reactionId: Int!, snapshotId: Int!): Reaction
    deleteReaction: async(root, args, ctx) => {
      const { reactionId, snapshotId } = args
      const { user: userId } = ctx.state

      const reaction = await db('reactions_snapshots')
        .where('user_id', userId)
        .andWhere('snapshot_id', snapshotId)
        .select('id')
        .first()

      await db('reactions_snapshots')
        .where('id', reaction.id)
        .del()

      return { id: reaction.id }
    }
  },
}

export default resolver
