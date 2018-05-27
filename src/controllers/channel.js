const util = require('../helpers/util');
const layer2lib = require('../helpers/layer2lib');
const keys = require('../../config/keys.json');

module.exports.open = (req, res, next) => {
  const channelData = req.swagger.params.body.value;
  console.log('open channel', channelData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};

module.exports.join = (req, res, next) => {
  const channelData = req.swagger.params.body.value;
  console.log('join channel', channelData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};

module.exports.confirm = (req, res, next) => {
  const channelData = req.swagger.params.body.value;
  console.log('confirm channel', channelData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};

module.exports.close = (req, res, next) => {
  const channelData = req.swagger.params.body.value;
  console.log('close channel', channelData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};