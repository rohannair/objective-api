// General API Error that includes a custom error message to send back to user,
// The status to of the response and then the full stack trace in order to
// include that in the logs
function ApiError(message, status, systemError = ' '){
  this.message = message;
  this.status = status;
  this.systemError = systemError;
}

ApiError.prototype = new Error();

module.exports = ApiError;
