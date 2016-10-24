const { verifyToken } = require('../utils/auth');
const ApiError = require('../utils/error');

const isAuthed = async (ctx, next) => {
  try {
    const token = ctx.headers.authorization && ctx.headers.authorization.replace('Bearer ', '');

    const user = await verifyToken(token);
    ctx.state.user = user.id;
    ctx.state.company = user.companyId;
    ctx.state.role = user.role;

    await next();
  } catch (e) {
    throw new ApiError(e.message, 401)
  }
}

module.exports = {
  isAuthed
}
