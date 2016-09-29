const { verifyToken } = require('../utils/token');

// Middleware to verify JWTs
const tokenCheck = async (ctx, next) => {
  if (ctx.token) {
    let user = await verifyToken(ctx.token);
    await next();
  } else {
    throw new Error('Not Authorized', 400, 'User does not have a token');
  }
}
