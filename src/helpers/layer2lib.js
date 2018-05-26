const firebase = require('firebase-admin');
const serviceAccount = require('../../config/ethba-hackathon-firebase-adminsdk-iegdh-1cf16f9678.json');
const Layer2lib = require('js-layer2lib');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://ethba-hackathon.firebaseio.com',
})

const firebaseProxy = new Layer2lib.FirebaseStorageProxy(firebase);

const options = {
  db: firebaseProxy,
  privateKey: '0x36935cf2550ecbacc19f5a3098028f59516e7fed7342aea9169cfb144af53ec1',
}

module.exports = new Layer2lib("http://localhost:8545", options);