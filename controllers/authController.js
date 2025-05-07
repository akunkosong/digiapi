const authModel = require('../models/authModel');
const admin = require('firebase-admin');

// REGISTER (email/password atau phone/password)
exports.register = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await authModel.register(phone, password);
    res.status(201).json({ message: 'Registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN (email/password)
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const token = await authModel.login(phone, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// SESSION CHECK (verifikasi token ID dari client)
exports.sessionCheck = async (req, res) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    res.status(200).json({ message: 'Session valid', uid: decoded.uid });
  } catch (err) {
    res.status(401).json({ error: 'Invalid session' });
  }
};

// LOGOUT (opsional jika client ingin clear token)
exports.logout = async (req, res) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    await admin.auth().revokeRefreshTokens(decoded.uid);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Logout failed' });
  }
};

// FORGOT PASSWORD (mengirim email reset password)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    res.status(200).json({ message: 'Reset link generated', link });
    // Bisa juga dikirim via nodemailer
  } catch (err) {
    res.status(400).json({ error: 'Failed to generate reset link' });
  }
};

// CONFIRM OTP (token OTP dari client setelah login dengan nomor HP)
exports.confirmOTP = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, phone_number } = decoded;

    // Optional: tambahkan user ke database jika belum ada
    const user = await authModel.savePhoneUserIfNotExists(uid, phone_number);

    res.status(200).json({ message: 'OTP verified', user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
