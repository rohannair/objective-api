'use strict';
import User from '../../models/User';
import Company from '../../models/Company';
import CheckIn from '../../models/CheckIn';
import Objective from '../../models/Objective';

import { addId, createRandomToken } from '../../utils';
import { genToken } from '../../utils/token';

import chalk from 'chalk';
const debug = require('debug')('app:debug');

import {
  encryptPassword,
  checkPassword,
  randomPassword
} from '../../utils/encryption';

import * as emails from './emails';

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
    const { company } = ctx.state;
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
      .where('company_id', company)
      .orwhereRaw(`lower(email) LIKE '%${q.toLowerCase()}%'`)
      .orWhereRaw(`lower(first_name) LIKE '%${q.toLowerCase()}%'`)
      .orWhereRaw(`lower(last_name) LIKE '%${q.toLowerCase()}%'`);

    ctx.body = { results };
  },

  get: async ctx => {
    const { limit, offset } = ctx.query;
    const { company } = ctx.state;

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
      .where('company_id', company)
      .limit(limit)
      .offset(offset)
      .orderBy('last_name')
      .eager('[objectives, squads]');

    ctx.body = {
      results,
      nextOffset: offset + limit | 25,
      nextLimit: limit || 25
    }
  },

  getOne: async ctx => {
    const { id } = ctx.params;
    const { company } = ctx.state;

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
      .eager('[objectives, squads]')
      .where({ id })
      .andWhere('company_id', company)
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
    try {
      const { email, jobTitle } = ctx.request.body;
      const { company, user: adminId } = ctx.state;

      const user = await User
        .query()
        .where({
          email: email,
          company_id: company
        })
        .first();

      if (user) {
        ctx.throw(`User ${user} already exists`, 200);
        return;
      }

      const companyInfo = await Company
        .query()
        .where({ id: company })
        .select('domain')
        .first();

      const signupToken = await createRandomToken();
      const password = await randomPassword();
      const newUser = await User
        .query()
        .insert(addId({
            email,
            job_title: jobTitle,
            company_id: company,
            signup_token: signupToken,
            digest: await encryptPassword(password)
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

        const admin = await User
          .query()
          .where({ id: adminId})
          .select(['first_name', 'last_name', 'email'])
          .first();

        const emailResult = await emails.inviteUser({
          email,
          signupToken,
          admin: {
            name: `${admin.firstName} ${admin.lastName}`,
            email: admin.email
          },
          domain: companyInfo.domain.split('.')[0]
        })

      ctx.status = 201;
      ctx.body = { user: newUser, signupToken };
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
        .andWhere('company_id', company)
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
    const { name, timeline, squadId, keyResults, resources } = ctx.request.body;
    const { company, role } = ctx.state;

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
      .andWhere('company_id', company)
      .select(
        'users.id',
        'users.email',
        'users.first_name',
        'users.last_name',
        'users.img',
        'users.job_title',
        'users.pending'
      )
      .eager('[objectives.[key_results, check_ins, resources]]')
      .filterEager('objectives.check_ins', b => {
        b.orderBy('created_at', 'desc');
        b.limit(3);
      });

      ctx.body = {
        user,
        squadId,
        userId: id
      };
  },

  createCheckIn: async ctx => {
    const { body } = ctx.request;
    const { company, role } = ctx.state;

    const checkIn = await CheckIn
      .query()
      .insert(body);

    const squad = await Objective
      .query()
      .where({id: body.objectiveId})
      .select('squad_id')
      .first();

    const user = await User
      .query()
      .where({id: body.userId})
      .andWhere('company_id', company)
      .select(
        'users.id',
        'users.email',
        'users.first_name',
        'users.last_name',
        'users.img',
        'users.job_title',
        'users.pending'
      )
      .eager('[objectives.[key_results, check_ins, resources]]')
      .filterEager('objectives.check_ins', b => {
        b.orderBy('created_at', 'desc');
        b.limit(3);
      });

    ctx.body = {
      user,
      userId: body.userId,
      squadId: squad.squadId
    }
  }

});

module.exports = userControllers(User);
