const admin = require('firebase-admin');
const axios = require('axios');
const db = require('../config/firebase'); // Realtime Database root ref

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY; // simpan di .env

exports.register = async (email, password) => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    // Tambahkan user ke database
    const userData = {
      uid: userRecord.uid,
      email,
      createdAt: Date.now()
    };

    await db.ref(`users/${userRecord.uid}`).set(userData);

    return userData;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.login = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );

    return response.data.idToken;
  } catch (err) {
    throw new Error(err.response?.data?.error?.message || 'Login failed');
  }
};

exports.savePhoneUserIfNotExists = async (uid, phone) => {
  const ref = db.ref(`users/${uid}`);
  const snapshot = await ref.once('value');

  if (!snapshot.exists()) {
    const data = { uid, phone, createdAt: Date.now() };
    await ref.set(data);
    return data;
  }

  return snapshot.val();
};
