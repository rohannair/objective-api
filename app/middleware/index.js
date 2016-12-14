'use strict';
import { verifyToken } from '../utils/auth';

const isAuthed = async (ctx, next) => {
  const token = ctx.headers.authorization
    && ctx.headers.authorization.replace('Bearer ', '');

  const user = await verifyToken(token);
  ctx.state.user = user.user_metadata.oiq_id;
  ctx.state.email = user.email;
  ctx.state.company = user.user_metadata.c_id;
  ctx.state.role = user.role;

  await next();
};

module.exports = {
  isAuthed
};
