'use strict';
import { verifyToken } from '../utils/auth';

const isAuthed = async (ctx, next) => {
  const token = ctx.headers.authorization
    && ctx.headers.authorization.replace('Bearer ', '');

  const user = await verifyToken(token);
  ctx.state.user = user.id;
  ctx.state.company = user.companyId;
  ctx.state.role = user.role;

  await next();
};

module.exports = {
  isAuthed
};
