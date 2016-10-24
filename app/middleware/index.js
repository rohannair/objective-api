const { verifyToken } = require('../utils/auth');

const isAuthed = async (ctx, next) => {
  try {
    const token = ctx.headers.authorization && ctx.headers.authorization.replace('Bearer ', '');

    const user = await verifyToken(token);
    ctx.state.user = user.id;
    ctx.state.company = user.companyId;
    ctx.state.role = user.role;

    await next();
  } catch(e) {
    ctx.status = 401;
    ctx.body = {
      message: 'Could not verify token'
    }
  }
}

module.exports = {
  isAuthed
}
