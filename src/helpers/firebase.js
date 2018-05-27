const firebase = require('firebase-admin');
const serviceAccount = require('../../config/ethba-hackathon-firebase-adminsdk-iegdh-1cf16f9678.json');

module.exports = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://ethba-hackathon.firebaseio.com',
});