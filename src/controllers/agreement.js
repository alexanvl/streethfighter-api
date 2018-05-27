const util = require('../helpers/util');
const layer2lib = require('../helpers/layer2lib');
const keys = require('../../config/keys.json');

module.exports.open = async (req, res, next) => {
  const { publicKey, balanceWei } = req.swagger.params.body.value;
  //Alice agreement
  const agreementOptions = {
    dbSalt: publicKey,
    ID: `${publicKey}${keys.publicKey}`,
    partyA: publicKey,
    partyB: keys.public,
    balanceA: balanceWei,
    balanceB: balanceWei,
  };

  //entryID
  const entryID = agreementOptions.ID + agreementOptions.salt;

  await layer2lib.createGSCAgreement(agreementOptions);

  const agreementAlice = await layer2lib.getGSCAgreement(entryID);
  //const tx = await layer2lib.gsc.getTransactions(entryID);
  let agreementState = await layer2lib.gsc.getStates(entryID);
  agreementState = agreementState[0];
  //Ingrid joins agreement
  agreementOptions.dbSalt = keys.publicKey; //TODO
  const ingridEntryID = ''; //TODO

  await layer2lib.joinGSCAgreement(agreementOptions, agreementState);
  //const agreementIngrid = await layer2lib.getGSCAgreement(ingridEntryID);

  util.response(layer2lib.getGSCAgreement(ingridEntryID), 200, res, next);
};

module.exports.close = (req, res, next) => {
  const agreementData = req.swagger.params.body.value;
  console.log('close agreement', agreementData);
  util.response(Promise.resolve({ success: true }), 200, res, next);
};
