const APIError = require('../helpers/error');
const response = require('../helpers/response');

module.exports.handleError = (res, error, next) => {
  if (error instanceof APIError) {
    //known error
    response.error(res, error.statusCode, error.message, next);
  } else if (error.message === 'PERMISSION_DENIED: Permission denied') {
    //firebase schema error
    response.error(res, 400, 'Bad Request', next);
  } else {
    //unknown error
    response.error(res, 500,  error.message, next);
  }
}

module.exports.isAuthedUser = (userId, req, res, next) => {
  if (req.data.authUser.uid === userId) {
    return true;
  }

  response.error(res, 401, 'Unauthorized', next);
  return false;
}

module.exports.response = (promise, code, res, next) => {
  return promise
    .then((result) => {
      response.success(res, code, result, next);
    }).catch((error) => {
      module.exports.handleError(res, error, next);
    });
};