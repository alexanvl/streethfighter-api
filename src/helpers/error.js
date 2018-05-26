function APIError(code, message) {
  this.statusCode = code;
  this.message = message;
  this.stack = (new Error()).stack;
}

APIError.prototype = new Error();

module.exports = APIError;
