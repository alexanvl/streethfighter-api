const util = require('../helpers/util');
const layer2lib = require('../helpers/layer2lib');
const keys = require('../../config/keys.json');

module.exports.open = async (req, res, next) => {
  const { agreement, state } = req.swagger.params.body.value;
  agreement.dbSalt = keys.public;
  let ingridId = agreement.ID + agreement.dbSalt;

  await layer2lib.joinGSCAgreement(agreement, state);

  util.response(layer2lib.getGSCAgreement(ingridId), 200, res, next);
};

module.exports.close = (req, res, next) => {
  const agreementData = req.swagger.params.body.value;
  console.log('close agreement', agreementData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};
