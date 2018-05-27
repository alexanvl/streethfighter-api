const util = require('../helpers/util');
const firebase = require('../helpers/firebase');
const layer2lib = require('../helpers/layer2lib');
const keys = require('../../config/keys.json');

module.exports.open = (req, res, next) => {
  const {
    publicKey,
    channel,
    agreement,
  } = req.swagger.params.body.value;

  //check if both parties channel open
  firebase.database().ref(channel.id).once('value')
    .then(ss => {
      const channelDoc = ss.val();
      // set that we've received the open channel
      return firebase.database().ref(channel.id).update({
        [publicKey]: { channel, agreement }
      }).then(async () => {
        // check that counterparty channel is open
        if (channelDoc && channelDoc[channel.counterparty]) {
          const updates = {}
          const cpData = channelDoc[channel.counterparty];
          // join both channels and notify
          const chanIngrid1 = channel;
          chanIngrid.dbSalt = keys.public;
          agreementIngrid = agreement;
          agreementIngrid.dbSalt = keys.public;
          await layer2lib.gsc.joinChannel(chanIngrid1, agreementIngrid, chanIngrid1.stateRaw);
          const agreementAck1 = await layer2lib.getGSCAgreement(`${agreementIngrid.id}${agreementIngrid.dbSalt}`);

          const chanIngrid2 = cpData.channel;
          chanIngrid2.dbSalt = keys.public;
          agreementIngrid2 = cpData.agreement;
          agreementIngrid2.dbSalt = keys.public;
          await layer2lib.gsc.joinChannel(chanIngrid2, agreementIngrid2, chanIngrid2.stateRaw);
          const agreementAck2 = await layer2lib.getGSCAgreement(`${agreementIngrid2.id}${agreementIngrid2.dbSalt}`);
          updates[`joinedChannel/${channel.id}/${publicKey}`] = agreementAck1;
          updates[`joinedChannel/${channel.id}/${channel.counterparty}`] = agreementAck2;

          return firebase.database().ref().update(updates);
        }
      })
    })
    .then(() => {
      util.response(Promise.resolve({ success: true }), 200, res, next);
    })
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