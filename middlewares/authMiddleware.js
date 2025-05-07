const admin = require('firebase-admin');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // inject uid, email, dll ke request
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
