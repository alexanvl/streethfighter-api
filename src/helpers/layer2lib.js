const firebase = require('firebase-admin');
const Layer2lib = require('js-layer2lib');
const keys = require('../../config/keys.json');
const serviceAccount = require('../../config/ethba-hackathon-firebase-adminsdk-iegdh-1cf16f9678.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://ethba-hackathon.firebaseio.com',
})

const firebaseProxy = new Layer2lib.FirebaseStorageProxy(firebase);

const options = {
  db: firebaseProxy,
  privateKey: keys.private,
}

const l2lib = new Layer2lib('http://localhost:8545', options);
l2lib.initGSC();

module.exports = l2lib;