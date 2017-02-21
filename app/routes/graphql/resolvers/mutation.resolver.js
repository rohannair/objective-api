import db from '../../../db'

import models from '../../../models'
import { addId, createRandomToken } from '../../../utils'
import { randomPassword, encryptPassword } from '../../../utils/encryption'
import { putSnapshotImage } from '../../../utils/paparazzi'
import { addCollaborator } from '../../../queries/collaborators'
import { formatSnapshotMutation } from '../../../utils/graphql_helpers'

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
     * Objectives
     ***/

    // Create an Objective
    createObjective: async (root, args, ctx) => {
      const { name } = args
      const { endsAt } = ctx.request.body.variables
      const { company, user: ownerId } = ctx.state

      let insertObject = addId({
        name,
        companyId: company,
        ownerId
      })

      if (endsAt) {
        insertObject = {
          ...insertObject,
          targetEndsAt: endsAt
        }
      }

      const objective = await models.Objective.query()
        .insert(insertObject)
        .returning(['id', 'company_id', 'target_ends_at as ends_at', 'name', 'owner_id', 'user_id', 'created_at', 'updated_at'])

      return objective
    },

    // Update an objective
    editObjective: async (root, args, ctx) => {
      const { id, name } = args
      const { endsAt, owner, isPrivate } = ctx.request.body.variables
      const { company, user: userId } = ctx.state

      let insertObject = {
        name,
        companyId: company,
        updatedAt: Date.now()
      }

      if (endsAt) {
        insertObject = {
          ...insertObject,
          targetEndsAt: endsAt
        }
      }

      // changing owner
      if (owner && userId === owner) {
        insertObject = {
          ...insertObject,
          ownerID: owner
        }
      }

      // check if owner to allow change
      if (owner && userId === owner.id) {
        insertObject = {
          ...insertObject,
          isPrivate
        }
      }

      const objective = await models.Objective.query()
        .update(insertObject)
        .where({
          id,
          company_id: company
        })
        .returning(['id', 'company_id', 'target_ends_at as ends_at',  'name', 'owner_id', 'user_id', 'is_private', 'created_at', 'updated_at'])
        .first()

      return objective
    },

    // Add a collaborator to an objective
    addCollaborator: async(root, args, ctx) => {
      const { user, objective } = args
      // const currentUser = ctx.state.user

      // Add user as collaborator
      const collaborator = await addCollaborator(db, user, objective)

      // TODO: create notification email here (or other type of notification)

      return collaborator[0]
    },

    deleteCollaborator: async(root, args, ctx) => {
      const { user, objective } = args

      const { id } = await db('objectives_users')
        .where('user_id', user)
        .andWhere('objective_id', objective)
        .select('id')
        .first()

      await db('objectives_users')
        .where('id', id)
        .del()

      return { id }
    },

    /// Create a new snapshot
    // addSnapshot(body: String, objective: String, bodyJson: String): Snapshot
    addSnapshot: async (root, args, ctx) => {
      const { body, objective, blocker, img, bodyJson } = args
      const { company, user: userId } = ctx.state

      try {
        // Pass img to paparazzi service
        const imageUrl = await putSnapshotImage(img)

        const snapshot = await models.Snapshot.query()
          .insert({
            body,
            bodyJson,
            blocker,
            objective_id: objective,
            company_id: company,
            user_id: userId,
            img: imageUrl
          })
          .returning('*')
          .then(formatSnapshotMutation)
        
        return snapshot
      } catch (e) {
        ctx.throw(422, e)
      }
    },

    editSnapshotObjective: async(root, args, ctx) => {
      let { id, objectiveId } = args

      const snapshot = await models.Snapshot.query()
        .where({ id })
        .update({
          objective_id: objectiveId || null
        })
        .first()
        .returning('*')
        .then(formatSnapshotMutation)

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
    },

    /**
      Tasks
    */

    // Create tasks
    createTask: async (root, args, ctx) => {
      const { objective, title, isComplete } = args

      const insertObject = {
        title,
        is_complete: isComplete,
        objective_id: objective
      }

      const task = await models.Task.query()
        .insert(insertObject)
        .returning('*')

      return task
    },

    editTask: async (root, args, ctx) => {
      const { id } = args
      const { title, isComplete } = ctx.request.body.variables

      let insertObject = {}

      if (isComplete !== undefined) {
        insertObject = {
          isComplete
        }
      }

      if (title !== undefined) {
        insertObject = {
          ...insertObject,
          title
        }
      }

      const task = await models.Task.query()
        .update(insertObject)
        .where({
          id
        })
        .returning('*')
        .first()

      return task
    },

    deleteTask: async (root, args, ctx) => {
      const { id } = args

      const updateObject = {
        hidden: true
      }

      const task = await models.Task.query()
        .update(updateObject)
        .where({id})
        .returning('id')
        .first()

      return task
    }
  },

}

export default resolver
