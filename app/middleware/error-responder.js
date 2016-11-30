'use strict';
const error = require('debug')('app:error');

const UNKNOWN_ERROR_CODE = 500;
const UNAUTHORIZED_ERROR_CODE = 401;

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === UNAUTHORIZED_ERROR_CODE) err.message = 'Protected resource, use Authorization header to get access';

    ctx.status = err.status || UNKNOWN_ERROR_CODE;
    ctx.body = { message: err.message || 'An error occurred' };

    error(`${ctx.status} response: ${JSON.stringify(ctx.body)}`);
    if (ctx.status === UNKNOWN_ERROR_CODE) {
      error(`${err.stack}`);
    }

    if (process.env.NODE_ENV === 'production') {
      const raven = require('raven');
      const sentry = new raven.Client(process.env.SENTRY_API_URL);

      sentry.captureException(err);
    }
  }
};
