const models = require('../models');
const util = require('../helpers/util');

module.exports.open = (req, res, next) => {
  const agreementData = req.swagger.params.body.value;
  console.log('open agreement', agreementData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};

module.exports.close = (req, res, next) => {
  const agreementData = req.swagger.params.body.value;
  console.log('close agreement', agreementData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};
