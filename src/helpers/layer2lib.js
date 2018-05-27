const Layer2lib = require('js-layer2lib');
const firebase = require('./firebase');
const keys = require('../../config/keys.json');

const firebaseProxy = new Layer2lib.FirebaseStorageProxy(firebase);

const options = {
  db: firebaseProxy,
  privateKey: keys.private,
};

const l2lib = new Layer2lib('https://rinkeby.infura.io', options);
l2lib.initGSC();

module.exports = l2lib;