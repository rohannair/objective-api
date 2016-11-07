'use strict';
import User from '../../models/User';
import Objective from '../../models/Objective';

import { addId } from '../../utils';
import { genToken } from '../../utils/token';

import chalk from 'chalk';
const debug = require('debug')('app:debug');

import {
  encryptPassword,
  checkPassword,
  randomPassword
} from '../../utils/encryption';

const userControllers = User => ({
  logout: async ctx => {
    ctx.session = null;

    ctx.status = 200;
    ctx.body = {
      message: 'Logged out!',
      logout: true,
    }
  },

  search: async ctx => {
    const { q } = ctx.query;

    const results = await User
      .query()
      .select(
        'id',
        'first_name',
        'last_name',
        'email',
        'role',
        'img',
        'job_title'
       )
      .whereRaw(`lower(email) LIKE '%${q.toLowerCase()}%'`)
      .orWhereRaw(`lower(first_name) LIKE '%${q.toLowerCase()}%'`)
      .orWhereRaw(`lower(last_name) LIKE '%${q.toLowerCase()}%'`);

    ctx.body = { results };
  },

  get: async ctx => {
    const { limit, offset } = ctx.query;

    const results = await User
      .query()
      .select(
        'id',
        'email',
        'first_name',
        'last_name',
        'img',
        'job_title',
        'role',
        'pending'
      )
      .limit(limit)
      .offset(offset)
      .orderBy('last_name')
      .eager('[objectives]');

    ctx.body = {
      results,
      nextOffset: offset + limit | 25,
      nextLimit: limit || 25
    }
  },

  getOne: async ctx => {
    const { id } = ctx.params;

    const user = await User
      .query()
      .select(
        'id',
        'email',
        'first_name',
        'last_name',
        'img',
        'job_title',
        'role',
        'pending'
      )
      .eager('[objectives]')
      .where({ id })
      .first();

    ctx.body = { user };
  },

  create: async ctx => {
    const { body } = ctx.request;
    const { company } = ctx.state;

    const pword = await randomPassword();

    const user = await User
      .query()
      .insert({
        ...addId(body),
        digest: encryptPassword(pword),
        company_id: company
      })
      .returning([
        'id',
        'email',
        'first_name',
        'last_name',
        'img',
        'job_title',
        'role',
        'pending'
      ]);

      // TODO: send email to user with password

      ctx.status = 201;
      // TODO: get rid of returning the password here
      ctx.body = { user: { ...user, password: pword } };
  },

  invite: async ctx => {
    const { email, jobTitle } = ctx.request.body;
    const { company } = ctx.state;

    try {
      const user = await User
        .query()
        .where({
          email,
          company_id: company
        })
        .first();

      if (user) throw new Error(`User ${user} already exists`, );

      const newUser = await User
        .query()
        .insert(addId({
            email,
            job_title: jobTitle,
            company_id: company
        }))
        .returning([
          'id',
          'email',
          'first_name',
          'last_name',
          'img',
          'job_title',
          'role',
          'pending'
        ]);

      ctx.status = 201;
      ctx.body = { user: newUser };
    } catch(e) {
      ctx.status = 500;
      ctx.body = {
        message: e.message
      }
    }

  },

  updatePassword: async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const { user, company, role } = ctx.state;

    if (user === id) {
      // TODO: Do some shit here to reset a password
    }
  },

  update: async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const { company, role } = ctx.state;

    // TODO: Does user have permission to edit?
    try {
      const isAdmin = await(isAdmin(role));
      const user = await User
        .query()
        .update({
          ...omit(body, ['digest'])
        })
        .where({ id })
        .returning([
          'id',
          'email',
          'first_name',
          'last_name',
          'img',
          'job_title',
          'role',
          'pending'
        ])

      ctx.body = { user };
    } catch(e) {
      ctx.body = {
        message: 'Not authorized to edit that user'
      }
    }
  },

  createObjective: async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const { name, timeline, squadId, keyResults, resources } = body;

    const mission = await Objective
      .query()
      .insertWithRelated({
        ...addId({
          name: name,
          timeline: timeline,
          squad_id: squadId,
          user_id: id
        }),

        key_results: keyResults.map(v => ({ name: v })),
        resources: resources.map(v => ({ name: v }))
      });

    const user = await User
      .query()
      .where({id})
      .select(
        'users.id',
        'users.email',
        'users.first_name',
        'users.last_name',
        'users.img',
        'users.job_title',
        'users.pending'
      )
      .eager('[objectives.[key_results, resources]]');

      ctx.body = {
        user,
        squadId,
        userId: id
      };
  }

});

module.exports = userControllers(User);
