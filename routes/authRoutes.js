const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint untuk auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/session', authController.sessionCheck);
router.post('/forgot-password', authController.forgotPassword);
router.post('/confirm-otp', authController.confirmOTP); // jika menggunakan phone

module.exports = router;
