'use strict';
import User from '../../models/User';

const { addId } = require('../../utils');

const {
  encryptPassword,
  checkPassword,
  randomPassword
} = require('../../utils/encryption');

const {
  genToken
} = require('../../utils/token');

const userControllers = User => ({
  logout: async ctx => {
    ctx.session = null;

    ctx.status = 200;
    ctx.body = {
      message: 'Logged out!',
      logout: true,
    }
  },

  searchUsers: async ctx => {
    const { q } = ctx.query;

    const results = await User
      .query()
      .select('id', 'first_name', 'last_name', 'email', 'role', 'img', 'job_title')
      .where('email', 'LIKE', q + '%')
      .orWhere('first_name', 'LIKE', q + '%')
      .orWhere('last_name', 'LIKE', q + '%');

    ctx.body = { results };
  },

  getUsers: async ctx => {
    const { limit, offset } = ctx.query;

    const results = await User
      .query()
      .select('id', 'first_name', 'last_name', 'email', 'role', 'img', 'job_title')
      .limit(limit)
      .offset(offset)
      .orderBy('last_name')
      .eager('[squads]');

    ctx.body = {
      results,
      nextOffset: offset + limit | 25,
      nextLimit: limit || 25
    }
  },

  getOneUser: async ctx => {
    const { id } = ctx.params;

    const user = await User
      .query()
      .select('id', 'first_name', 'last_name', 'email', 'img', 'job_title')
      .eager('[squads]')
      .where({ id })
      .first();

    ctx.body = { user };
  },

  createUser: async ctx => {
    const { body } = ctx.request;
    const { company } = ctx.state;

    const pword = await randomPassword();

    const user = await User
      .query()
      .insert({
        ...addId(body),
        digest: encryptPassword(pword)
      })
      .where('company_id', company)
      .returning(['id', 'first_name', 'last_name', 'email', 'role', 'img', 'job_title']);

      // TODO: send email to user with password

      ctx.status = 201;
      // TODO: get rid of returning the password here
      ctx.body = { user: { ...user, password: pword } };
  },

  updateUserPassword: async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const { user, company, role } = ctx.state;

    if (user === id) {
      // TODO: Do some shit here to reset a password
    }
  },

  updateUser: async ctx => {
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
        .returning(['id', 'first_name', 'last_name', 'email', 'role', 'img', 'job_title'])

      ctx.body = { user };
    } catch(e) {
      ctx.body = {
        message: 'Not authorized to edit that user'
      }
    }
  }

});

module.exports = userControllers(User);
