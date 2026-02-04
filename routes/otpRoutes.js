// routes/otpRoutes.js
const express = require('express');
const OtpController = require('../controllers/otpController');
const SendMailController = require('../controllers/sendMailController');
const { validateSpamMiddleware } = require('../middleware');

const router = express.Router();
const otpController = new OtpController();
const mailer = new SendMailController();

router.post('/otp/generate', validateSpamMiddleware, async (req, res) => {
  const { email, type, organization, subject } = req.body;
  const otp = await otpController.generateOtp(email, type);
  await mailer.sendMail(email, otp, organization, subject);
  res.json({ message: 'OTP sent' });
});

router.post('/otp/verify', async (req, res) => {
  const { email, otp } = req.body;
  await otpController.verifyOtp(email, otp);
  res.json({ message: 'OTP verified' });
});

module.exports = router;
