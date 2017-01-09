'use strict'
import { verifyToken } from '../utils/auth'

/* eslint-disable no-unused-vars */
const debug = require('debug')('app:debug')

const isAuthed = async (ctx, next) => {
  const token = ctx.headers.authorization
    && ctx.headers.authorization.replace('Bearer ', '')

  try {
    const user = await verifyToken(token)
    ctx.state.user = user.app_metadata.oiq_id
    ctx.state.email = user.email
    ctx.state.company = user.app_metadata.c_id
    ctx.state.role = user.app_metadata.role

    await next()
  } catch (e) {
    ctx.throw(e.msg, 401)
  }
}

module.exports = {
  isAuthed
}
