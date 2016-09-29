const winston = require('winston');

const UNKNOWN_ERROR_CODE = 500;

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || UNKNOWN_ERROR_CODE;
    ctx.body = err.message || '';

    winston.error(`${ctx.status} response: ${ctx.body}`);
    if (ctx.status === UNKNOWN_ERROR_CODE) {
      winston.error(`${err.stack}`);
    }
  }
}
