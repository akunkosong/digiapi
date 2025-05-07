const admin = require('firebase-admin');
const serviceAccount = require('../google-services.json');
const path = require('path');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-e9143-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

const db = admin.database();
module.exports = db;
